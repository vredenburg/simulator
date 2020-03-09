import { Entity } from "./Entity";
import { Graphics } from "../util/Graphics";
import { MovingEntity } from "./MovingEntity";

export class StaticEntity extends Entity {
    public width: number;
    public height: number;

    /**
     * Creates an instance of StaticEntity
     * 
     * @param {number} xPos Spawn location on the x-axis.
     * @param {number} yPos Spawn location on the y-axis.
     * @param {number} width StaticEntity width.
     * @param {number} height StaticEntity height.
     */
    constructor(xPos: number, yPos: number, width: number, height: number) {
        super(xPos, yPos);
        this.width = width;
        this.height = height;
    }

    public update(otherEntities: MovingEntity[]): void {

    }

    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawSquare(ctx, this.position.x, this.position.y, this.width, this.height);
    }
}