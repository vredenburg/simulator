import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";

export class StaticEntity extends Entity {
    public scale: number;

    // Initialises Vector2D with default values of 0,0 if no parameters are passed.
    constructor(xPos: number, yPos: number) {
        super(xPos, yPos);
    }

    public update(delta: number): void {

    }

    public render(): void {

    }
}