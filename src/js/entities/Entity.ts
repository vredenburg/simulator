import { Vector2D } from "../util/Vector2D";

export abstract class Entity {
    public position: Vector2D;
    public scale: number;
    public mass: number;
    public presence: number;

    constructor(xPos: number, yPos: number) {
        this.position = new Vector2D(xPos, yPos);
        this.scale = 1.0;
        this.mass = 1000.0;
        this.presence = 15.0 * 15.0;
    }

    public abstract update(otherEntities: Entity[]): void;

    public abstract render(ctx: CanvasRenderingContext2D): void;
}