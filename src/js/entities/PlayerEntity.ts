import { MovingEntity } from "./MovingEntity";
import { Graphics } from "../util/Graphics";

export class PlayerEntity extends MovingEntity {
    
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    public render(ctx: CanvasRenderingContext2D): void {
        Graphics.drawCircle(ctx, this.position.x, this.position.y);
        this.showPerception(ctx);
    }
}