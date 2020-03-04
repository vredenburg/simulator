declare var require: any;
require('../css/main.css');

import { Game } from './Game';

class App {
	private _game: Game;
	private _paused: boolean;

	constructor(game: Game) {
		this._game = game;
		document.addEventListener('keydown',this.keyPressed);
	}

	public setup(): void {
		// Any setup that is required that only runs once before world loads goes here

		this.gameLoop();
	}

	private gameLoop(): void {
        // need to bind the current this reference to the callback
		requestAnimationFrame(this.gameLoop.bind(this)); 

		if(!this._paused) {
			this._game.update();
			this._game.render();
		}
	}

	private keyPressed = (e: KeyboardEvent) => {
        if(e.key ==  "p") {
			this._paused = !this._paused;
		}
	}
}

window.onload = () => {
	let app = new App(new Game());

	app.setup();
}