import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";

export class StaticEntity extends Entity {

    // Initialises Vector2D with default values of 0,0 if no parameters are passed.
    constructor(xPos: number, yPos: number, width: number, height: number) {
        super(xPos, yPos, width, height);
    }

    public update(delta: number): void {

    }

    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawSquare(ctx, this.position.x, this.position.y, this.width, this.height);
    }
}