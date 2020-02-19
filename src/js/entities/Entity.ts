import { Vector2D } from "../util/Vector2D";

export abstract class Entity {
    public position: Vector2D;
    public scale: number;

    constructor(position: Vector2D) {
        this.position = position;
    }

    public abstract update(delta: number): void;

    public abstract render(ctx: CanvasRenderingContext2D): void;
}