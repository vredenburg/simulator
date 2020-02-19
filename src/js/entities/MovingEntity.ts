import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { SteeringBehaviour } from "../behaviours/SteeringBehaviour";
import { wtf } from "../util/WhyCantJSDoThisProperly";

export class MovingEntity extends Entity {
    public velocity: Vector2D;
    public mass: number;
    public maxSpeed: number;
    public steeringBehaviour: SteeringBehaviour;

    constructor(position: Vector2D) {
        super(position);
        this.mass = 60;
        this.maxSpeed  = 150;
        this.velocity = new Vector2D();
    }

    public update(delta: number): MovingEntity {
        let steeringForce: Vector2D = this.steeringBehaviour.act(this);
        let acceleration: Vector2D = steeringForce.divide(this.mass);

        this.velocity
            .add(acceleration.multiply(delta))
            .truncate(this.maxSpeed);

        this.position.add(this.velocity.multiply(delta));
        return this;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
    }

    public wrapAround = (width: number, height: number): void => {
        this.position = new Vector2D(wtf.mod(this.position.x,  width), wtf.mod(this.position.y, height));
    }
}