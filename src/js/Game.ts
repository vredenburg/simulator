import { Vector2D } from "./util/Vector2D";
import { World } from "./world/World";

export class Game {
    private world: World;

    constructor(width: number, heigth: number) {
        console.log("Generating new world...");

        this.world = new World(width, heigth);
        this.world.canvas.addEventListener('click', this.clickEvent, false);
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
}