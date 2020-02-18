import { Vector2D } from "./util/Vector2D";
import { Entity } from "./entities/Entity";
import { World } from "./world/World";

export default class Game {

    private entities: Array<Entity>;
    
    public target: Entity;
    

	constructor() {
        // this.world = new World(500,500);
		// this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		// this.canvas.width = this.width;
		// this.canvas.height = this.height;
        // this.ctx = this.canvas.getContext("2d");
        
        // this.ctx.beginPath();
        // this.ctx.arc(50, 50, 10, 0, 2 * Math.PI, false);
        // this.ctx.stroke();
	}

	public render(): void {
        console.log('rendering');
	}
}
