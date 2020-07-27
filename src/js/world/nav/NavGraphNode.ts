import { GraphNode } from "./GraphNode";
import { Vector2D } from "../../util/Vector2D";
import { Graphics } from "../../util/Graphics";

export class NavGraphNode extends GraphNode {
    protected position: Vector2D;
    protected extraInfo: number;

    constructor(index: number, position: Vector2D) {
        super(index);
        this.position = position;
    }

    public getPosition(): Vector2D {
        return this.position;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        if(this.index >= 0) {
            Graphics.drawNode(ctx, this.position.x, this.position.y);
        }
    }
}