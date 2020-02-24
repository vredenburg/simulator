import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity"

export abstract class SteeringBehaviour {
    // private weight: number;

    // public getWeight(): number {
    //     return this.weight;
    // }
    // public setWeight(weight: number): void {
    //     this.weight = weight;
    // }
    public abstract act(movingEntity: MovingEntity, extraParameter?: any): Vector2D;
}