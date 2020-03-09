import { Entity, MovingEntity, PlayerEntity, Swarm, EntityFactory } from "../entities"
import { wtf } from "../util/WhyCantJSDoThisProperly";

export class World {
    private static _instance: World;
    public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public entities: Array<Entity>;
    public swarms: Array<Swarm>;
    public target?: PlayerEntity;
    public gameSpeed: number;

    private constructor() {
        this.gameSpeed = 0.8;
        this.generateCanvas(800, 500)
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
     * @param {number} width 
     * @param {number} height 
     */
    public generateCanvas(width: number, height: number): void {
        console.log("Generating canvas...");
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * Fills the world with entities.
     */
    public populate(): void {
        console.log("Populating world...");
        this.entities = new Array<MovingEntity>();

        this.entities.push(EntityFactory.getSwarmEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));

        this.entities.push(EntityFactory.getMovingEntity(wtf.random(this.canvas.width), wtf.random(this.canvas.height)));

        this.entities.push(EntityFactory.getStaticEntity(300, 200, 40, 140));
        
        this.target = new PlayerEntity(300,300);
    }
}