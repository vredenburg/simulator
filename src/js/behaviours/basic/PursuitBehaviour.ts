import { SeekBehaviour } from "./SeekBehaviour";
import { Vector2D } from "../../util/Vector2D";
import { MovingEntity } from "../../entities/MovingEntity";

export class PursuitBehaviour extends SeekBehaviour {

    /**
     * Calculates the steering force for the given MovingEntity
     * 
     * @param {MovingEntity} movingEntity 
     * @param {MovingEntity} target 
     * @returns {Vector2D} Steering force.
     */
    public act(movingEntity: MovingEntity, target: MovingEntity): Vector2D {
        let targetPrediction: MovingEntity = target.clone();

        let toEvader: Vector2D = targetPrediction.position.newSub(movingEntity.position);

        let relativeHeading: number = movingEntity.heading.dot(target.heading);

        if(toEvader.dot(movingEntity.velocity) > 0 && relativeHeading < -0.95) {
            return super.act(movingEntity, target);
        }

        let lookAheadTime: number = toEvader.length() / (movingEntity.maxSpeed + target.maxSpeed);

        targetPrediction.velocity.multiply(lookAheadTime);

        return super.act(movingEntity, targetPrediction);
    }
}