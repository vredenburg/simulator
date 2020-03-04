import { SteeringBehaviour } from "./SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { Entity } from "../entities/Entity";
import { MovingEntity } from "../entities/MovingEntity";
import { TargetedBehaviour } from "./TargetedBehaviour";

export class FleeBehaviour extends TargetedBehaviour {

    public act(movingEntity: MovingEntity, threat: MovingEntity): Vector2D {
        let desiredVelocity: Vector2D = movingEntity.position.clone();
        desiredVelocity.sub(threat.position);

        if(desiredVelocity.lengthSquared() > movingEntity.panicDistance || this.target == null) {
            return new Vector2D(0,0);
        }

        desiredVelocity
            .normalise()
            .multiply(movingEntity.maxSpeed);
        return desiredVelocity.sub(movingEntity.velocity);
    }
}