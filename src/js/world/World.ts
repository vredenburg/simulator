import { Vector2D } from "../util/Vector2D";
import { Entity } from "../entities/Entity";
import { MovingEntity } from "../entities/MovingEntity";
import { Behaviour } from "../behaviours/Behaviour";
import { SeekBehaviour } from "../behaviours/SeekBehaviour";
import { FleeBehaviour } from "../behaviours/FleeBehaviour";

export class World {
    public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public movingEntities: Array<MovingEntity>;
    public target?: Entity;

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
        this.ctx = this.canvas.getContext("2d");
    }

    private populate(): void {
        console.log("Populating world...");
        
        this.movingEntities.push(new MovingEntity(new Vector2D(50,200)));
        this.movingEntities.push(new MovingEntity(new Vector2D(300,400)));

        this.target = new MovingEntity(new Vector2D(50,300));
        this.setBehaviour(Behaviour.SEEK);
    }

    public setBehaviour(behaviourType: number) {
        if(behaviourType == Behaviour.SEEK) {
            this.movingEntities.forEach(e => e.steeringBehaviour = new SeekBehaviour(this.target));
        } else if(behaviourType == Behaviour.FLEE) {
            this.movingEntities.forEach(e => e.steeringBehaviour = new FleeBehaviour(this.target));
        }
    }
}