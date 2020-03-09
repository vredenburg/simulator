import { Vector2D } from "./util/Vector2D";
import { World } from "./world/World";
import { BehaviourType } from "./util/Enums";

export class Game {
    private _world: World;
    private seperationSlider: HTMLInputElement;
    private alignmentSlider: HTMLInputElement;
    private cohesionSlider: HTMLInputElement;
    private _mouseDown: boolean;

    constructor() {
        this._world = World.Instance;
        this._world.populate();
        this._world.canvas.addEventListener('mousedown', this.mouseDownEvent, false);
        this._world.canvas.addEventListener('mousemove', this.moveEvent, false);
        this._world.canvas.addEventListener('mouseup', this.mouseUpEvent, false);
        this._mouseDown = false;

        // this.alignmentSlider = <HTMLInputElement> document.getElementById("alignmentWeight");
        // this.alignmentSlider.oninput = this.alignmentChanged;
        // this.seperationSlider = <HTMLInputElement> document.getElementById("seperationWeight");
        // this.seperationSlider.oninput = this.seperationChanged;
        // this.cohesionSlider = <HTMLInputElement> document.getElementById("cohesionWeight");
        // this.cohesionSlider.oninput = this.cohesionChanged;
    }

    public update(): void {
        this._world.entities.forEach(e => 
            e.update(this._world.entities)
        );
    }

    public render(): void {
        this._world.ctx.clearRect(0, 0, this._world.canvas.width, this._world.canvas.height);
        this._world.entities.forEach(e => e.render(this._world.ctx));
        this._world.target.render(this._world.ctx);
    }

    public mouseDownEvent = (e: MouseEvent): void => {
        this._world.target.position = new Vector2D(e.clientX, e.clientY);
        this._mouseDown = true; 
    }

    public moveEvent = (e: MouseEvent): void => {
        if(this._mouseDown === true) {
            this._world.target.position = new Vector2D(e.clientX, e.clientY);   
        }
    }

    public mouseUpEvent = (e: MouseEvent): void => {
        this._mouseDown = false; 
    }
    
    // public seperationChanged = (e: Event): void => {
    //     this._behaviourService.setWeight(BehaviourType.SEPERATION, +this.seperationSlider.value);
    // }

    // public alignmentChanged = (e: Event): void => {
    //     this._behaviourService.setWeight(BehaviourType.ALIGNMENT, +this.alignmentSlider.value);
    // }

    // public cohesionChanged = (e: Event): void => {
    //     this._behaviourService.setWeight(BehaviourType.COHESION, +this.cohesionSlider.value);
    // }
        
    public toggleBehaviour = (e: Event): void => {
                
    }
}