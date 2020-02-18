import { Vector2D } from "../util/Vector2D";
import { Entity } from "../entities/Entity";
import { MovingEntity } from "../entities/MovingEntity";
import { Graphics } from "../util/Graphics";
import {SeekBehaviour } from "../behaviours/SeekBehaviour";

export class World {
    private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;

    private movingEntities: Array<MovingEntity>;
    public target: Entity;

    // Initialises Vector2D with default values of 0,0 if no parameters are passed.
    constructor(width: number, heigth: number) {
        console.log("Generating new world...");
        this.width = width;
        this.height = heigth;
        this.movingEntities = new Array<MovingEntity>();
        
        
        this.generateCanvas();
        this.populate();
    }

    private generateCanvas(): void {
        console.log("Generating canvas...");
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.addEventListener('click', this.clickEvent, false);
        this.ctx = this.canvas.getContext("2d");
    }

    private populate(): void {
        console.log("Populating world...");
        let test: MovingEntity = new MovingEntity(new Vector2D(50,100));
        console.log(test);
        this.movingEntities.push(test);
        console.log(this.movingEntities.length);
        
        // this.entities.push(new MovingEntity(new Vector2D(50,200)));
        // this.entities.push(new MovingEntity(new Vector2D(50,300)));

        this.target = new MovingEntity(new Vector2D(50,300));
        this.movingEntities.forEach(e => e.steeringBehaviour = new SeekBehaviour(this.target));

        
    }

    public update(delta: number): void {
        this.movingEntities.forEach(e => e.update(delta));
        // this.movingEntities[0].update(delta);
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.movingEntities.forEach(e => e.render(this.ctx));
        this.target.render(this.ctx);
    }

    public clickEvent = (e: MouseEvent): void => {
        this.target.position = new Vector2D(e.clientX, e.clientY);   
    }
}