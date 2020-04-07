import { GraphNode } from "./GraphNode";
import { GraphEdge } from "./GraphEdge";
import { Graphics } from "../../util/Graphics";
import { NavGraphNode } from "./NavGraphNode";
import { Vector2D } from "../../util/Vector2D";

export class SparseGraph {

    private nodes: Array<GraphNode>;
    private edges: Array<GraphEdge>;
    private isDirectedGraph: boolean;
    private nextNodeIndex: number;
    private graphDensity: number;
    private xNodeCount: number;
    private yNodeCount: number

    /**
     * 
     * @param {boolean} isDirectedGraph 
     * @param {number} graphDensity Determines node density by dividing world size (x and y-axis)
     *                              by this value. Lower values yield a higher density.
     */
    constructor(isDirectedGraph: boolean, graphDensity: number) {
        this.nodes = new Array<GraphNode>();
        this.edges = new Array<GraphEdge>();
        this.isDirectedGraph = isDirectedGraph;
        this.nextNodeIndex = 0;
        this.graphDensity = graphDensity;
    }

    public getNextFreeNodeIndex(): number {
        return this.nextNodeIndex;
    }

    public getGraphDensity(): number {
        return this.graphDensity;
    }

    /**
     * Calculates the number of nodes on the x- and y axis, respectively.
     * 
     * @param worldWidth 
     * @param worldHeight 
     */
    public calculateNodeCount(worldWidth: number, worldHeight: number): void {
        this.graphDensity = this.graphDensity;
        this.xNodeCount = worldWidth / this.graphDensity;
        this.yNodeCount = worldHeight / this.graphDensity;
    }

    public getXNodeCount(): number {
        return this.xNodeCount
    }

    public getYNodeCount(): number {
        return this.yNodeCount;
    }

    public getNode(index: number): GraphNode {
        return this.nodes[index];
    }

    public getAllNodes(): Array<GraphNode> {
        return this.nodes;
    }

    public getEdge(from: number, to: number): GraphEdge {
        return;
    }

    public addNode(node: GraphNode): number {
        // node.index = this.nextNodeIndex;
        this.nodes[this.nextNodeIndex] = node;
        this.nextNodeIndex++;
        return node.index;
    }

    public removeNode(node: number): void {
        this.nodes[node].index = -1;
    }

    public addEdge(edge: GraphEdge): void {
        this.edges.push(edge);
    }

    public removeEdge(from: number, to: number): void {
        for(let i = 0; i < this.edges.length; i++) {
            if(this.edges[i].from === from && this.edges[i].to === to)
                this.edges.splice(i,1);
        }
    }

    public numNodes(): number {
        return this.edges.length;
    }

    public numActiveNodes(): number {
        let count: number;
        this.nodes.forEach(e => {
            if(e.index !== -1) count++;
        });
        return count;
    }

    public numEdges(): number {
        return this.edges.length;
    }

    public isDigraph(): boolean {
        return this.isDirectedGraph;
    }

    public isEmpty(): boolean {
        return this.nodes.length === 0;
    }

    public isPresent(node: number): boolean {
        if(this.nodes.length > node && this.nodes[node].index !== -1)
            return true;
        
        return false;
    }

    public save(): boolean {
        return;
    }

    public load(): boolean { 
        return;
    }

    public clear(): void {
        this.nodes = new Array<GraphNode>();
        this.edges = new Array<GraphEdge>();
        this.nextNodeIndex = 0;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.nodes.forEach(e => e.render(ctx))
        this.edges.forEach(e => {
            let from: NavGraphNode = <NavGraphNode> this.nodes[e.from];
            let to: NavGraphNode = <NavGraphNode> this.nodes[e.to];

            let fromPos = from.getPosition();
            let toPos = to.getPosition();
            Graphics.drawLine(ctx, fromPos.x, fromPos.y, toPos.x, toPos.y);
        })
    }
    
}