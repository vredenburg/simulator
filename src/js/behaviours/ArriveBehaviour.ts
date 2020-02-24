import { SteeringBehaviour } from "./SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { Entity } from "../entities/Entity";
import { MovingEntity } from "../entities/MovingEntity";

export class ArriveBehaviour extends SteeringBehaviour {
    public target: Entity;

    constructor(target: Entity) {
        super();
        this.target = target;
    }
    
    public act(movingEntity: MovingEntity): Vector2D {
        let toTarget: Vector2D = this.target.position
            .clone()
            .sub(movingEntity.position);

        let dist = toTarget.distance();
        
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