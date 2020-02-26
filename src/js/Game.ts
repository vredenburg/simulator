import { Vector2D } from "./util/Vector2D";
import { World } from "./world/World";
import { MovingEntityController } from "./controllers/MovingEntityController"

export class Game {
    private _world: World;
    private _movingEntityController: MovingEntityController;

    constructor() {
        this._movingEntityController = new MovingEntityController();
        this._world = World.Instance;
        this._world.canvas.addEventListener('click', this.clickEvent, false);
    }

    public update(delta: number): void {
        this._world.movingEntities.forEach(e => 
            e.position = this._movingEntityController.update(e, this._world.movingEntities)
        );
    }

    public render(): void {
        this._world.ctx.clearRect(0, 0, this._world.canvas.width, this._world.canvas.height);
        this._world.movingEntities.forEach(e => e.render(this._world.ctx));
        this._world.target.render(this._world.ctx);
    }

    public clickEvent = (e: MouseEvent): void => {
        this._world.target.position = new Vector2D(e.clientX, e.clientY);   
    }
}