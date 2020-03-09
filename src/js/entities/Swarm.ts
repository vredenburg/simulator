import { MovingEntity } from "./MovingEntity";
import { Entity } from "./Entity";
import { BehaviourSet } from "../behaviours/BehaviourSet";
import { Vector2D } from "../util/Vector2D";

export class Swarm extends Entity{
    public entities: Array<MovingEntity>;
    // public target: MovingEntity;

    constructor(xPos: number, yPos: number, size: number) {
        super(xPos, yPos);
        this.entities = new Array<MovingEntity>();
        for(let i = 0; i < size; i++) {
            this.entities.push(new MovingEntity(
                xPos,
                yPos
            ));
        }
    }

    public update(otherEntities: MovingEntity[]): void {
        this.entities.forEach(e => 
            e.update(this.entities));
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.entities.forEach(e => 
            e.render(ctx));
    }

}