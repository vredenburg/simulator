import { Vector2D } from "../util/Vector2D";
import { Entity, MovingEntity, PlayerEntity } from "../entities"
// import { Entity } from "../entities/Entity";
// import { MovingEntity } from "../entities/MovingEntity";
// import { PlayerEntity } from "../entities/PlayerEntity"
import { BehaviourType } from "../util/Enums";
import { SeekBehaviour } from "../behaviours/SeekBehaviour";
import { FleeBehaviour } from "../behaviours/FleeBehaviour";
import { ArriveBehaviour } from "../behaviours/ArriveBehaviour";
import { FlockBehaviour } from "../behaviours/FlockBehaviour";
import { wtf } from "../util/WhyCantJSDoThisProperly";

export class World {
    public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public movingEntities: Array<MovingEntity>;
    public target?: Entity;
    public playerArrayPos: number;

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
        
        for(let i = 0; i < 100; i++) {
            this.movingEntities.push(new MovingEntity(wtf.random(this.width),wtf.random(this.height)));
        }

        // this.movingEntities.push(new PlayerEntity(300,300));
        
        this.target = new MovingEntity(300,300);
        this.setBehaviour(BehaviourType.FLOCK);
    }

    public setBehaviour(behaviourType: number) {
        if(behaviourType == BehaviourType.SEEK) {
            this.movingEntities.forEach(e => e.steeringBehaviour = new SeekBehaviour(this.target));
        } else if(behaviourType == BehaviourType.FLEE) {
            this.movingEntities.forEach(e => e.steeringBehaviour = new FleeBehaviour(this.target));
        } else if(behaviourType == BehaviourType.ARRIVE) {
            this.movingEntities.forEach(e => e.steeringBehaviour = new ArriveBehaviour(this.target));
        } else if(behaviourType == BehaviourType.FLOCK) {
            this.movingEntities.forEach(e => e.steeringBehaviour = new FlockBehaviour());
        }
    }
}