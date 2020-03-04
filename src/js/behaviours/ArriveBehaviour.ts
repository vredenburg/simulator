import { TargetedBehaviour } from "./TargetedBehaviour";
import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity";

export class ArriveBehaviour extends TargetedBehaviour {

    public act(movingEntity: MovingEntity, target: MovingEntity): Vector2D {
        let toTarget: Vector2D = target.position
            .clone()
            .sub(movingEntity.position);

        let dist = toTarget.length();
        
        if(dist > 50) {
            const decelerationTweaker: number = 0.3;
            let speed: number = dist / (movingEntity.deceleration * decelerationTweaker);
            speed = Math.min(speed, movingEntity.maxSpeed);

            return toTarget
                .multiply(speed/dist)
                .sub(movingEntity.velocity);
            
        }
        return new Vector2D(0,0);
    }
}