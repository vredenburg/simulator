import { Controller } from "./Controller"
import { Entity, MovingEntity } from "../entities";
import { World } from "../world/World";
import { SeekBehaviour } from "../behaviours";
import { Vector2D } from "../util/Vector2D"
import { wtf } from "../util/WhyCantJSDoThisProperly";
import { BehaviourType } from "../util/Enums";

export class PlayerController implements Controller {

    private _world: World;
    private _seek: SeekBehaviour;

    constructor() {
        this._world = World.Instance;
        this._seek = new SeekBehaviour();

        document.addEventListener('keydown',this.keyPressed);
    }

    // WIP
    public update(entity: MovingEntity, desiredLocation: MovingEntity[]): Vector2D {
        // let steeringForce: Vector2D = new Vector2D();

        // steeringForce = this._seek.act(entity, desiredLocation);
        // let acceleration: Vector2D = steeringForce.divide(entity.mass);

        // entity.velocity
        // .add(acceleration.multiply(0.2))
        // .truncate(entity.minSpeed, entity.maxSpeed)
        // .multiply((this._world.gameSpeed));

        // entity.position.add(entity.velocity);

        // entity.heading = entity.velocity.clone().normalise();

        // return entity.position;
        return;
    }

    public render(): void {

    }

    private keyPressed = (e: KeyboardEvent) => {
        if(e.key ==  "ArrowLeft") {
            this._world.target.position.add(new Vector2D(-5, 0));
        }
        if(e.key ==  "ArrowUp") {
            this._world.target.position.add(new Vector2D(0, -5));
        }
        if(e.key ==  "ArrowRight") {
            this._world.target.position.add(new Vector2D(5, 0));
        }
        if(e.key ==  "ArrowDown") {
            this._world.target.position.add(new Vector2D(0, 5));
        }
        
    }
}