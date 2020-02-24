import { Vector2D } from "./util/Vector2D";
import { World } from "./world/World";

export class Game {
    private world: World;
    private seperationSlider: HTMLInputElement;
    private alignmentSlider: HTMLInputElement;
    private cohesionSlider: HTMLInputElement;

    constructor(width: number, heigth: number) {
        this.world = new World(width, heigth);
        this.world.canvas.addEventListener('click', this.clickEvent, false);

        this.alignmentSlider = <HTMLInputElement> document.getElementById("alignmentWeight");
        this.alignmentSlider.oninput = this.alignmentChanged;
        this.seperationSlider = <HTMLInputElement> document.getElementById("seperationWeight");
        this.seperationSlider.oninput = this.seperationChanged;
        this.cohesionSlider = <HTMLInputElement> document.getElementById("cohesionWeight");
        this.cohesionSlider.oninput = this.cohesionChanged;
    }

    public update(delta: number): void {
        this.world.movingEntities.forEach(e => 
            e
            .update(delta, this.world.movingEntities)
            .wrapAround(this.world.width, this.world.height)
        );
    }

    public render(): void {
        this.world.ctx.clearRect(0, 0, this.world.width, this.world.height);
        this.world.movingEntities.forEach(e => e.render(this.world.ctx));
        this.world.target.render(this.world.ctx);
    }

    public clickEvent = (e: MouseEvent): void => {
        this.world.target.position = new Vector2D(e.clientX, e.clientY);   
    }

    public seperationChanged = (e: Event): void => {
        console.log(this.seperationSlider.value);
    }
    public alignmentChanged = (e: Event): void => {
        console.log(this.alignmentSlider.value);
    }
    public cohesionChanged = (e: Event): void => {
        console.log(this.cohesionSlider.value);
    }
}