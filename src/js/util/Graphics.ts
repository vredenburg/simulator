import { Circle } from "../util/Enums";
import { Vector2D } from "./Vector2D";

export abstract class Graphics {
    public static drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc(x, y, Circle.SIZE, Circle.START_ANGLE, Circle.END_ANGLE, false);
        ctx.stroke();
    }

    public static drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, heading: Vector2D): void {
        let angle: number = Math.PI + Math.atan2(-heading.x + x, heading.y - y);

        ctx.save();
        ctx.beginPath();
        
        // ctx.rotate( (Math.PI / 180) * 25);
        
        ctx.translate(x,y);
        
        ctx.rotate(angle);
        ctx.moveTo(x, y);
        
        ctx.lineTo(x+9, y+4);
        ctx.lineTo(x+9, y-4);
        ctx.closePath();
        ctx.stroke();
        
        ctx.translate(-x, -y);
        ctx.restore();
    }

    public static drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.rect(x-width/2,y-height/2,width,height);
        ctx.stroke();
    }

    public static drawForce(ctx: CanvasRenderingContext2D, x: number, y: number, velocity: Vector2D): void {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(x, y);
        ctx.lineTo(x+velocity.x*10, y+velocity.y*10);
        ctx.stroke();
    }

    public static drawPerceptionRadius(ctx: CanvasRenderingContext2D, x: number, y: number, p: number): void {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.arc(x, y, Circle.SIZE+Math.sqrt(p), Circle.START_ANGLE, Circle.END_ANGLE, false);
        ctx.stroke();
    }

    public static drawNode(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc(x, y, Circle.SIZE, Circle.START_ANGLE, Circle.END_ANGLE, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc(x, y, Circle.SIZE+5, Circle.START_ANGLE, Circle.END_ANGLE+5, false);
        ctx.stroke();
    }

    public static drawLine(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke(); 
    }

    public static draw(): void {

    }

}