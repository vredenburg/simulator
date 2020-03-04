import { Vector2D } from "../util/Vector2D";

export abstract class Entity {
    public position: Vector2D;
    public width: number;
    public height: number;
    public scale: number;
    public presence: number;
    public perceptionRadius: number;

    constructor(xPos: number, yPos: number, width: number, height: number) {
        this.position = new Vector2D(xPos, yPos);
        this.width = width;
        this.height = height;
        this.scale = 1;
        this.presence = 10 * 10;
        this.perceptionRadius = 50 * 50;
    }

    // public abstract update(delta: number, otherEntities: Entity[]): void;

    public abstract render(ctx: CanvasRenderingContext2D): void;
}