import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity";
import { Entity } from "../entities/Entity";
import { TargetedBehaviour } from "./TargetedBehaviour";

export class SeekBehaviour extends TargetedBehaviour {
    
    /**
     * Calculates the steering force for the given MovingEntity
     * 
     * @param {MovingEntity} movingEntity 
     * @param {MovingEntity} target 
     * @returns {Vector2D} Steering force.
     */
    public act(movingEntity: MovingEntity, target: Entity): Vector2D {
        
        if(target.position == null) {
            return new Vector2D(0,0);
        }

        return target.position
            .clone()
            .sub(movingEntity.position)
            .normalise()
            .multiply(movingEntity.maxSpeed)
            .sub(movingEntity.velocity);
    }
}