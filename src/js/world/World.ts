import { Entity, StaticEntity, MovingEntity, PlayerEntity, Swarm, EntityFactory } from "../entities"
import { wtf } from "../util/WhyCantJSDoThisProperly";
import { SparseGraph, NavGraphNode, GraphEdge } from "./nav";
import { Vector2D } from "../util/Vector2D";

export class World {
    private static _instance: World;
    public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public staticEntities: Array<StaticEntity>;
    public movingEntities: Array<Entity>;
    public swarms: Array<Swarm>;
    public target?: PlayerEntity;
    public gameSpeed: number;
    public sparseGraph: SparseGraph;

    private constructor() {
        this.gameSpeed = 0.8;
        this.staticEntities = new Array<StaticEntity>();
        this.movingEntities = new Array<MovingEntity>();
        this.generateCanvas(1200, 900);
        this.generateMap();
        this.generateNavGraph(true, 75);
        this.generateAdjacencyList();
    }

    /**
     * Returns the World instance or creates a new instance if it doesn't yet exist.
     * 
     * @returns {World} World instance
     */
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * Generates the canvas.
     * 
     * @param {number} width x-axis
     * @param {number} height y-axis
     */
    public generateCanvas(width: number, height: number): void {
        console.log("Generating canvas...");
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
    }

    public generateMap() {
        this.staticEntities.push(EntityFactory.getStaticEntity(300, 215, 150, 150));
        this.staticEntities.push(EntityFactory.getStaticEntity(600, 215, 80, 100));
        this.staticEntities.push(EntityFactory.getStaticEntity(300, 800, 90, 90));
    }

    /**
     * Dynamically generates nodes based on the map size and present static entities. Not used right now.
     * 
     * @param {boolean} isDirectedGraph 
     * @param {number} graphDensity Determines node density by dividing world size (x and y-axis)
     *                              by this value. Lower values yield a higher density.
     */
    public generateNavGraph(isDirectedGraph: boolean, graphDensity: number): void {
        this.sparseGraph = new SparseGraph(isDirectedGraph, graphDensity);
        this.sparseGraph.calculateNodeCount(this.canvas.width, this.canvas.height);

        let xNodes: number = this.sparseGraph.getXNodeCount();
        let yNodes: number = this.sparseGraph.getYNodeCount();
        let xIncrement: number = this.canvas.width / xNodes;
        let yIncrement: number = this.canvas.height / yNodes;

        for(let y = 0; y < yNodes; y++) {
            for(let x = 0; x < xNodes; x++) {
                let pos: Vector2D = new Vector2D(xIncrement / 2 + xIncrement * x, yIncrement / 2 + yIncrement * y);
                
                let foundObstacle: boolean = false;

                // Checks for obstacles
                for(let obstacle of this.staticEntities) {
                    let distanceToObstacle: number = pos.clone().sub(obstacle.position).lengthSquared();
                    if(distanceToObstacle < 9001) {
                        foundObstacle = true;
                        break;
                    }
                }

                let index: number;

                // Sets the index of the node to -1 of an obstacle is found.
                if(foundObstacle) {
                    index = -1;
                }
                else {
                    index = this.sparseGraph.getNextFreeNodeIndex(); 
                }
                
                let node: NavGraphNode = new NavGraphNode(index, pos);
                this.sparseGraph.addNode(node)
            }
        }
    }

    public generateAdjacencyList(): void {
        let nodes: Array<NavGraphNode> = <Array<NavGraphNode>> this.sparseGraph.getAllNodes();
        let xNodeCount: number = this.sparseGraph.getXNodeCount();
        let yNodeCount: number = this.sparseGraph.getYNodeCount();
        let total: number = xNodeCount * yNodeCount;

        let toRight: number;
        let toBelow: number;
 
        for(let i = 0; i < total; i++) {
            if(nodes[i].index >= 0) {
                toRight = (i % xNodeCount) + 1;
                toBelow = i + xNodeCount;

                if(toRight < xNodeCount) {
                    if(nodes[i + 1].index >= 0) {
                        let edge: GraphEdge = new GraphEdge(i, i + 1);
                        this.sparseGraph.addEdge(edge);
                        console.log(JSON.parse(JSON.stringify(edge)));
                    }
                }
                if(toBelow < total) {
                    if(nodes[toBelow].index >= 0) {
                        let edge: GraphEdge = new GraphEdge(i, toBelow);
                        this.sparseGraph.addEdge(edge);
                        console.log(JSON.parse(JSON.stringify(edge)));
                    }
                }
            }
        } 
    }

    /**
     * Fills the world with entities.
     */
    public populate(): void {
        console.log("Populating world...");

        this.movingEntities.push(EntityFactory.getSwarmEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));

        this.movingEntities.push(EntityFactory.getMovingEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));
        this.movingEntities.push(EntityFactory.getMovingEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));
        this.movingEntities.push(EntityFactory.getMovingEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));
        this.movingEntities.push(EntityFactory.getMovingEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));

        this.target = new PlayerEntity(300,300);
    }
}