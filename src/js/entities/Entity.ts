import { Vector2D } from "../util/Vector2D";

export abstract class Entity {
    public position: Vector2D;
    public scale: number;
    public presence: number;
    public perceptionRadius: number;

    constructor(xPos: number, yPos: number) {
        this.position = new Vector2D(xPos, yPos);
        this.presence = 10 * 10;
        this.perceptionRadius = 100 * 100;
    }

    public abstract update(delta: number, otherEntities: Entity[]): void;

    public abstract render(ctx: CanvasRenderingContext2D): void;
}