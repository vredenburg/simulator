import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { SteeringBehaviour } from "../behaviours/SteeringBehaviour";
import { Deceleration } from "../util/Enums";

export class MovingEntity extends Entity {
    public velocity: Vector2D;
    public mass: number;
    public minSpeed: number;
    public maxSpeed: number;
    public deceleration?: Deceleration;

    constructor(xPos: number, yPos: number) {
        super(xPos, yPos);
        this.mass = 60;
        this.minSpeed = 1;
        this.maxSpeed = 5;
        this.deceleration = Deceleration.NORMAL;
        this.velocity = new Vector2D(Math.random()*10, Math.random()*10);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
    }
}