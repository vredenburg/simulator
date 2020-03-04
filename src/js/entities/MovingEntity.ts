import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { SteeringBehaviour } from "../behaviours/SteeringBehaviour";
import { Deceleration } from "../util/Enums";

export class MovingEntity extends Entity {
    public velocity: Vector2D;
    public heading: Vector2D;
    public mass: number;
    public minSpeed: number;
    public maxSpeed: number;
    public maxTurnRate: number;
    public deceleration?: Deceleration;
    public panicDistance: number;

    /**
     * @class MovingEntity
     * @public
     * @param {number} xPos - Spawn position on x-axis.
     * @param {number} yPos - Spawn position on y-axis.
     * @param {number} width - Entity width.
     * @param {number} height - Entity height.
     */
    constructor(xPos: number, yPos: number, width: number = 5, height: number = 5) {
        super(xPos, yPos, width, height);
        this.mass = 120;
        this.minSpeed = 1;
        this.maxSpeed = 15;
        this.deceleration = Deceleration.NORMAL;
        this.velocity = new Vector2D(Math.random()*10, Math.random()*10);
        this.heading = new Vector2D();
        this.panicDistance = 100*100;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
        Graphics.drawForce(ctx, this.position.x, this.position.y, this.velocity);
        // this.showPerception(ctx);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    public showPerception(ctx: CanvasRenderingContext2D): void {
        Graphics.drawPerceptionRadius(ctx, this.position.x,  this.position.y, this.perceptionRadius);
    }

    public clone(): MovingEntity {
        let target: MovingEntity = new MovingEntity(0,0);
        Object.assign(target, this);
        return target;
    }
}