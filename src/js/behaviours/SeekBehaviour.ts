import { SteeringBehaviour } from "./SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { Entity } from "../entities/Entity";
import { MovingEntity } from "../entities/MovingEntity";

export class SeekBehaviour extends SteeringBehaviour {
    public target: Entity;

    constructor(target: Entity) {
        super();
        this.target = target;
    }
    public act(movingEntity: MovingEntity): Vector2D {
        if(this.target.position == null) {
            return new Vector2D(0,0);
        }

        let desiredVelocity: Vector2D = this.target.position.clone();
        desiredVelocity.sub(movingEntity.position);
        desiredVelocity.normalise();
        desiredVelocity.multiply(movingEntity.maxSpeed);
        return desiredVelocity.sub(movingEntity.velocity);
    }
}