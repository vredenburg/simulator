import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { SteeringBehaviour } from "../behaviours/SteeringBehaviour";

export class MovingEntity extends Entity {
    public velocity: Vector2D;
    public mass: number;
    public maxSpeed: number;
    public steeringBehaviour: SteeringBehaviour;

    // Initialises Vector2D with default values of 0,0 if no parameters are passed.
    constructor(position: Vector2D) {
        super(position);
        this.mass = 60;
        this.maxSpeed  = 150;
        this.velocity = new Vector2D();
    }

    public update(delta: number): void {
        let steeringForce: Vector2D = this.steeringBehaviour.act(this);
        let acceleration: Vector2D = steeringForce.divide(this.mass);

        this.velocity.add(acceleration.multiply(delta));
        this.velocity.truncate(this.maxSpeed);

        this.position.add(this.velocity.multiply(delta));
        // console.log(steeringForce);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
    }
}