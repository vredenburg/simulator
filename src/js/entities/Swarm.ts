import { MovingEntity } from "./MovingEntity";
import { Entity } from "./Entity";
import { BehaviourSet } from "../behaviours/BehaviourSet";
import { Vector2D } from "../util/Vector2D";
import { BehaviourType } from "../util/Enums";

export class Swarm extends Entity{
    public entities: Array<MovingEntity>;
    private seperationSlider: HTMLInputElement;
    private alignmentSlider: HTMLInputElement;
    private cohesionSlider: HTMLInputElement;

    constructor(xPos: number, yPos: number, size: number) {
        super(xPos, yPos);
        this.entities = new Array<MovingEntity>();
        for(let i = 0; i < size; i++) {
            this.entities.push(new MovingEntity(
                xPos,
                yPos
            ));
        }
        this.alignmentSlider = <HTMLInputElement> document.getElementById("alignmentWeight");
        this.alignmentSlider.oninput = this.alignmentChanged;
        this.seperationSlider = <HTMLInputElement> document.getElementById("seperationWeight");
        this.seperationSlider.oninput = this.seperationChanged;
        this.cohesionSlider = <HTMLInputElement> document.getElementById("cohesionWeight");
        this.cohesionSlider.oninput = this.cohesionChanged;
    }

    public update(otherEntities: MovingEntity[]): void {
        this.entities.forEach(e => 
            e.update(this.entities));
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.entities.forEach(e => 
            e.render(ctx));
    }

    public seperationChanged = (e: Event): void => {
        this.entities.forEach(e =>
            e.behaviourSet.setWeight(BehaviourType.SEPERATION, +this.seperationSlider.value));
        // this._behaviourService.setWeight(BehaviourType.SEPERATION, +this.seperationSlider.value);
    }

    public alignmentChanged = (e: Event): void => {
        this.entities.forEach(e =>
            e.behaviourSet.setWeight(BehaviourType.ALIGNMENT, +this.alignmentSlider.value));
        // this._behaviourService.setWeight(BehaviourType.ALIGNMENT, +this.alignmentSlider.value);
    }

    public cohesionChanged = (e: Event): void => {
        this.entities.forEach(e =>
            e.behaviourSet.setWeight(BehaviourType.COHESION, +this.cohesionSlider.value));
        // this._behaviourService.setWeight(BehaviourType.COHESION, +this.cohesionSlider.value);
    }
}