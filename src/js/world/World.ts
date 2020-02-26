import { Entity, MovingEntity, PlayerEntity } from "../entities"
import { wtf } from "../util/WhyCantJSDoThisProperly";

export class World {
    private static _instance: World;
    public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public movingEntities: Array<MovingEntity>;
    public target?: PlayerEntity;
    public gameSpeed: number;

    private constructor() {
        this.gameSpeed = 0.8;
        this.generateCanvas(800, 500)
        this.populate();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public generateCanvas(width: number, height: number): void {
        console.log("Generating canvas...");
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
    }

    public populate(): void {
        console.log("Populating world...");
        this.movingEntities = new Array<MovingEntity>();
        
        for(let i = 0; i < 50; i++) {
            this.movingEntities.push(new MovingEntity(wtf.random(this.canvas.width),wtf.random(this.canvas.height)));
        }
        
        this.target = new PlayerEntity(300,300);
    }
}