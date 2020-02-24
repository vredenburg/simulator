import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { SteeringBehaviour } from "../behaviours/SteeringBehaviour";
import { wtf } from "../util/WhyCantJSDoThisProperly";
import { Deceleration } from "../util/Enums";

export class MovingEntity extends Entity {
    public velocity: Vector2D;
    public mass: number;
    public minSpeed: number;
    public maxSpeed: number;
    public steeringBehaviour: Array<SteeringBehaviour>;
    public deceleration?: Deceleration;

    constructor(xPos: number, yPos: number) {
        super(xPos, yPos);
        this.mass = 60;
        this.minSpeed = 2;
        this.maxSpeed = 5;
        this.deceleration = Deceleration.NORMAL;
        this.velocity = new Vector2D(Math.random()*10, Math.random()*10);
        this.steeringBehaviour = new Array<SteeringBehaviour>();
    }

    public update(delta: number, otherEntities: Entity[]): MovingEntity {
        let steeringForce: Vector2D = new Vector2D();
        // this.steeringBehaviour.forEach(function (e)  {
        //     if(this.steeringBehaviour.weigth > 0) {
        //         steeringForce.add(e.act(this, otherEntities))
        //     }
        // });
        this.steeringBehaviour.forEach(e => steeringForce.add(e.act(this, otherEntities)));
        let acceleration: Vector2D = steeringForce.divide(this.mass);

        this.velocity
            .add(acceleration.multiply(delta))
            .truncate(this.minSpeed,this.maxSpeed);

        this.position.add(this.velocity.multiply(delta));
        return this;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
    }

    public wrapAround = (width: number, height: number): void => {
        // a custom modulo function is used here because apparantly JS' implementation of % can't deal with negative numbers
        this.position = new Vector2D(wtf.mod(this.position.x,  width), wtf.mod(this.position.y, height));
    }
}