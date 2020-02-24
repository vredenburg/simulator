import { Entity, MovingEntity, PlayerEntity } from "../entities"
import { BehaviourType } from "../util/Enums";
import {SeekBehaviour, FleeBehaviour, ArriveBehaviour, FlockBehaviour, FlockAlignmentBehaviour, FlockCohesionBehaviour, FlockSeperationBehaviour} from "../behaviours";
import { wtf } from "../util/WhyCantJSDoThisProperly";

export class World {
    public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public movingEntities: Array<MovingEntity>;
    public target?: Entity;

    public seperationWeight: number;
    public alignmentWeight: number;
    public cohesionWeight: number;

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
        
        this.target = new PlayerEntity(300,300);
        // this.setBehaviour(BehaviourType.COHESION);
        // this.setBehaviour(BehaviourType.ALIGNMENT);
        // this.setBehaviour(BehaviourType.SEPERATION);
        
        this.setBehaviour(BehaviourType.FLOCK);
        this.setBehaviour(BehaviourType.ARRIVE);
    }

    public setBehaviour(behaviourType: number): void {
        if(behaviourType == BehaviourType.SEEK) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new SeekBehaviour(this.target)));
        } else if(behaviourType == BehaviourType.FLEE) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new FleeBehaviour(this.target)));
        } else if(behaviourType == BehaviourType.ARRIVE) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new ArriveBehaviour(this.target)));
        } else if(behaviourType == BehaviourType.FLOCK) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new FlockBehaviour()));
        } else if(behaviourType == BehaviourType.ALIGNMENT) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new FlockAlignmentBehaviour()));
        } else if(behaviourType == BehaviourType.SEPERATION) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new FlockSeperationBehaviour()));
        } else if(behaviourType == BehaviourType.COHESION) {
            this.movingEntities.forEach(e => e.steeringBehaviour.push(new FlockCohesionBehaviour()));
        }
    }

    public updateBehaviourWeight(): void {

    }
}