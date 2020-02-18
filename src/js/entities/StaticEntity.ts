import { Vector2D } from "../util/Vector2D";
import { Entity } from "./Entity";

export class StaticEntity extends Entity {
    public scale: number;

    // Initialises Vector2D with default values of 0,0 if no parameters are passed.
    constructor(position: Vector2D) {
        super(position);
    }

    public update(delta: number): void {

    }

    public render(): void {

    }
}