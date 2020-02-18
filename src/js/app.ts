declare var require: any;
require('../css/main.css');

import { World } from './world/World';

class App {
	private _world: World;

	constructor(world: World) {
		this._world = world;
	}

	public setup(): void {
		// Any setup that is required that only runs once before world loads goes here

		this.gameLoop();
	}

	private gameLoop(): void {
        // need to bind the current this reference to the callback
		requestAnimationFrame(this.gameLoop.bind(this)); 

        this._world.update(0.5);
		this._world.render();
	}
}

window.onload = () => {
	let app = new App(new World(500, 500));

	app.setup();
}