import { Circle } from "../util/Enums";

export abstract class Graphics {
    public static drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.beginPath();
        ctx.arc(x, y, Circle.SIZE, Circle.START_ANGLE, Circle.END_ANGLE, false);
        ctx.stroke();
    }
}