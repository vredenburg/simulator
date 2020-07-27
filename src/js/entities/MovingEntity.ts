import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { SteeringBehaviour } from "../behaviours/SteeringBehaviour";
import { Deceleration } from "../util/Enums";
import { BehaviourSet } from "../behaviours/BehaviourSet";
import { wtf } from "../util/WhyCantJSDoThisProperly";
import { World } from "../world/World";

export class MovingEntity extends Entity {
    private _world: World;
    public velocity: Vector2D;
    public heading: Vector2D;
    public perceptionRadius: number;
    public minSpeed: number;
    public maxSpeed: number;
    public maxTurnRate: number;
    public deceleration?: Deceleration;
    public panicDistance: number;
    public behaviourSet: BehaviourSet;

    /**
     * @class MovingEntity
     * @public
     * @param {number} xPos - Spawn position on x-axis.
     * @param {number} yPos - Spawn position on y-axis.
     * @param {number} width - Entity width.
     * @param {number} height - Entity height.
     */
    constructor(xPos: number, yPos: number) {
        super(xPos, yPos);
        this._world = World.Instance;
        this.velocity = new Vector2D(Math.random()*10, Math.random()*10);
        this.heading = new Vector2D();
        this.perceptionRadius = 100.0 * 100.0;
        this.minSpeed = 20.0;
        this.maxSpeed = 50.0;
        this.deceleration = Deceleration.NORMAL;
        this.panicDistance = 100.0 *100.0;
        this.behaviourSet = new BehaviourSet();
    }

    /**
     * @method - Updates the entity object.
     * @param {MovingEntity[]}otherEntities 
     */
    public update(otherEntities: MovingEntity[]): void {

        let steeringForce: Vector2D = this.behaviourSet.act(this, otherEntities);
        let acceleration: Vector2D = steeringForce.divide(this.mass);

        this.velocity
            .add(acceleration)
            .normalise();

        this.position.add(this.velocity);
        this.heading = this.velocity.clone().normalise();

        this.wrapAround();
    }

    /**
     * @method - Renders the entity.
     * @param {CanvasRenderingContext2D} ctx 
     */
    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
        Graphics.drawForce(ctx, this.position.x, this.position.y, this.velocity);
        // this.showPerception(ctx);
    }

    /**
     * @method - Draws the perception radius of the entity.
     * @param {CanvasRenderingContext2D} ctx 
     */
    public showPerception(ctx: CanvasRenderingContext2D): void {
        Graphics.drawPerceptionRadius(ctx, this.position.x,  this.position.y, this.perceptionRadius);
    }

    /**
     * @method - Wraps around the entity to the other side of the map if the canvas borders are exceeded.
     */
    public wrapAround(): void {
        // a custom modulo function is used here because apparantly JS' implementation of % can't deal with negative numbers
        this.position =  new Vector2D(wtf.mod(this.position.x,  this._world.canvas.width), wtf.mod(this.position.y, this._world.canvas.height));
    }

    /**
     * @method - Returns a copy of the entity.
     * @returns {MovingEntity}
     */
    public clone(): MovingEntity {
        let target: MovingEntity = new MovingEntity(0,0);
        Object.assign(target, this);
        return target;
    }
}