import { Vector2D } from "../../util/Vector2D";
import { MovingEntity } from "../../entities/MovingEntity"

export abstract class SteeringBehaviour {
    public weight: number = 1;
    public isActive: boolean = false;
    
    public abstract act(movingEntity: MovingEntity, extraParameter?: any): Vector2D;
}