import { Vector2D } from "./util/Vector2D";
import { World } from "./world/World";
import { MovingEntityController } from "./controllers/MovingEntityController"
import { PlayerController } from "./controllers/PlayerController";

export class Game {
    private _world: World;
    private _movingEntityController: MovingEntityController;
    private _playerController: PlayerController;
    private _mouseDown: boolean;

    constructor() {
        this._movingEntityController = new MovingEntityController();
        this._playerController = new PlayerController();
        this._world = World.Instance;
        this._world.canvas.addEventListener('mousedown', this.mouseDownEvent, false);
        this._world.canvas.addEventListener('mousemove', this.moveEvent, false);
        this._world.canvas.addEventListener('mouseup', this.mouseUpEvent, false);
        this._mouseDown = false;
    }

    public update(): void {
        this._world.movingEntities.forEach(e => 
            e.position = this._movingEntityController.update(e, this._world.movingEntities)
        );
    }

    public render(): void {
        this._world.ctx.clearRect(0, 0, this._world.canvas.width, this._world.canvas.height);
        this._world.movingEntities.forEach(e => e.render(this._world.ctx));
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
    
}