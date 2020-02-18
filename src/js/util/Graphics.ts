enum Circle {
    SIZE = 5,
    START_ANGLE = 0,
    END_ANGLE = 2 * Math.PI
}
export abstract class Graphics {
    public static drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.beginPath();
        ctx.arc(x, y, Circle.SIZE, Circle.START_ANGLE, Circle.END_ANGLE, false);
        ctx.stroke();
    }
}