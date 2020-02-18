import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity"

export abstract class SteeringBehaviour {
    public abstract act(movingEntity: MovingEntity, extraParameter?: any): Vector2D;
}