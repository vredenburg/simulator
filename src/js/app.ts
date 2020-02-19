declare var require: any;
require('../css/main.css');

import { Game } from './Game';

class App {
	private _game: Game;

	constructor(game: Game) {
		this._game = game;
	}

	public setup(): void {
		// Any setup that is required that only runs once before world loads goes here

		this.gameLoop();
	}

	private gameLoop(): void {
        // need to bind the current this reference to the callback
		requestAnimationFrame(this.gameLoop.bind(this)); 

        this._game.update(0.9);
		this._game.render();
	}
}

window.onload = () => {
	let app = new App(new Game(800, 500));

	app.setup();
}