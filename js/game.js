// Must be after 'terrain.js'
// Must be after 'perso.js'

/**
 * Game, classe principale du jeu
 * Pas bien codée, mais il paraît que ça fonctionne
 */
function Game() {
	this.terrain = new Terrain();
	this.robot = new Robot();
	this.perso = new Perso();
	this.food = new Food();
	this.totem = new Totem();
	this.ui = new RobotUI();
	this.elements = null;
	this.elementCount = 20;

	this.snakes = null;
	this.snakeCount = 5;

	this.time = -1;
	this.paused = false;

	this.spriteSize = 32;
	this.sheetSize = 32;

	this.spriteSheet = new Image();

	this.drawSpriteSize = 64;

	this.isOver = false;
	this.gameIsOver = function() {
		return this.isOver;
	};

	this.drawImage = function(imageNumber, x, y) {
		var ctx = this.getContext();
		ctx.beginPath();

		ctx.drawImage(this.spriteSheet, this.spriteSize * (imageNumber % this.sheetSize), this.spriteSize * Math.floor(imageNumber / this.sheetSize), this.spriteSize, this.spriteSize, x, y, this.drawSpriteSize, this.drawSpriteSize);

		ctx.stroke();
	}

	this.pause = function() {
		this.paused = true;
	}
	this.unpause = function() {
		this.paused = false;
	}

	this.getCanvas = function() {
		return document.getElementById("myCanva");
	}

	this.getCanvasSize = function() {
		var canvas = document.getElementById("myCanva");
		return {width: canvas.width, height: canvas.height};
	}

	this.getContext = function() {
		var c = document.getElementById("myCanva");
		return c.getContext("2d");
	}

	this.isInRect = function(rect, x, y) {
		return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.width;
	}

	this.addSnake = function() {
		var canvasSize = game.getCanvasSize();
		this.snakes[this.snakeCount] = new Snake();
		if(this.snakes[this.snakeCount].color == 2) {
			this.snakes[this.snakeCount].speedFactor *= 2;
		}
		var c = Math.floor(Math.random() * canvasSize.height / this.drawSpriteSize) * 2;
		if(c < canvasSize.height / this.drawSpriteSize) {
			this.snakes[this.snakeCount].setPosition(0, c * this.drawSpriteSize);
		} else {
			this.snakes[this.snakeCount].setPosition(canvasSize.width - this.drawSpriteSize, (c - canvasSize.height / this.drawSpriteSize) * this.drawSpriteSize);
		}

		this.snakeCount++;
	}

	this.start = function() {
		var date = new Date();
		this.time = date.getTime();
		this.mainLoop();
		this.spriteSheet.src = 'img/fond.png';
		var ctx = this.getContext();
		ctx.imageSmoothingEnabled = false;
		this.robot.setPosition(10, 5, this.drawSpriteSize);
		this.perso.setPosition(8, 5, this.drawSpriteSize);

		var canvasSize = this.getCanvasSize();

		this.food.position = {
			x: Math.floor(canvasSize.width / this.drawSpriteSize / 2) * this.drawSpriteSize,
			y: Math.floor(canvasSize.height / this.drawSpriteSize / 2) * this.drawSpriteSize
		};

		this.elements = [];
		for(var iElement = 0; iElement < this.elementCount; iElement++) {
			this.elements[iElement] = new Element();

			var position = {x: Math.floor(Math.random() * canvasSize.width / this.drawSpriteSize) * this.drawSpriteSize, y: Math.floor(Math.random() * canvasSize.height / this.drawSpriteSize) * this.drawSpriteSize};

			var stop = false;
			while(!stop) {
				stop = true;
				for(var i = 0; i < iElement; i++) {
					if(position.x == this.elements[i].position.x && position.y == this.elements[i].position.y) {
						stop = false;
						break;
					}
				}

				if(position.x == this.food.position.x && position.y == this.food.position.y) {
					stop = false;
				}
				if(position.x == this.totem.position.x && position.y == this.totem.position.y) {
					stop = false;
				}
				if(position.x == this.perso.currentPosition.x && position.y == this.perso.currentPosition.y) {
					stop = false;
				}
				if(position.x == this.robot.currentPosition.x && position.y == this.robot.currentPosition.y) {
					stop = false;
				}

				if(!stop) {
					position = {x: Math.floor(Math.random() * canvasSize.width / this.drawSpriteSize) * this.drawSpriteSize, y: Math.floor(Math.random() * canvasSize.height / this.drawSpriteSize) * this.drawSpriteSize};
				}
			}

			this.elements[iElement].setPosition(position.x, position.y);
		}

		this.snakes = [];
		for(var iSnake = 0; iSnake < this.snakeCount; iSnake++) {
			this.snakes[iSnake] = new Snake();
			if(this.snakes[iSnake].color == 2) {
				this.snakes[iSnake].speedFactor *= 2;
			}

			if(Math.floor(Math.random() * 2) == 0) {
				var c = Math.floor(Math.random() * canvasSize.height / this.drawSpriteSize) * 2;
				var test = c - canvasSize.height / this.drawSpriteSize;
				if(c < canvasSize.height / this.drawSpriteSize) {
					this.snakes[iSnake].setPosition(0, c * this.drawSpriteSize);
				} else {
					this.snakes[iSnake].setPosition(canvasSize.width - this.drawSpriteSize, (c - canvasSize.height / this.drawSpriteSize) * this.drawSpriteSize);
				}
			} else {
				var c = Math.floor(Math.random() * canvasSize.width / this.drawSpriteSize) * 2;
				var test = c - canvasSize.width / this.drawSpriteSize;
				if(c < canvasSize.width / this.drawSpriteSize) {
					this.snakes[iSnake].setPosition(c * this.drawSpriteSize, 0);
				} else {
					this.snakes[iSnake].setPosition((c - canvasSize.height / this.drawSpriteSize) * this.drawSpriteSize, canvasSize.width - this.drawSpriteSize);
				}

			}
		}

		var that = this;
		document.addEventListener('keydown', function(event) {
			that.terrain.onKeyboard(event.keyCode);
			that.robot.onKeyboard(event.keyCode);
			that.perso.onKeyboard(event.keyCode);
			that.food.onKeyboard(event.keyCode);
			that.totem.onKeyboard(event.keyCode);
			that.ui.onKeyboard(event.keyCode);
		});

		var canvas = this.getCanvas();
		canvas.addEventListener('click', function(event) {
			var rect = canvas.getBoundingClientRect();
			var x = event.clientX - rect.left;
			var y = event.clientY - rect.top;

			if(that.isInRect(that.terrain.getRect(), x, y)) {
				that.terrain.onClick(x, y);
			}

			if(that.isInRect(that.robot.getRect(), x, y)) {
				that.robot.onClick(x, y);
			}

			if(that.isInRect(that.perso.getRect(), x, y)) {
				that.perso.onClick(x, y);
			}
			if(that.isInRect(that.food.getRect(), x, y)) {
				that.food.onClick(x, y);
			}
			if(that.isInRect(that.totem.getRect(), x, y)) {
				that.totem.onClick(x, y);
			}
			if(that.isInRect(that.ui.getRect(), x, y)) {
				that.ui.onClick(x, y);
			} else {
				that.ui.onClickOutside(x, y);
			}
		}, false);
	};

	this.callUpdates = function(deltaTime) {
		this.terrain.update.bind(this.terrain)(deltaTime);
		if(this.snakes != null) {
			for(var iSnake = 0; iSnake < this.snakeCount; iSnake++) {
				this.snakes[iSnake].update.bind(this.snakes[iSnake])(deltaTime);
			}
		}
		this.robot.update.bind(this.robot)(deltaTime);
		this.perso.update.bind(this.perso)(deltaTime);
		this.food.update.bind(this.food)(deltaTime);
		this.totem.update.bind(this.totem)(deltaTime);

		if(this.elements != null) {
			for(var iElement = 0; iElement < this.elementCount; iElement++) {
				this.elements[iElement].update.bind(this.elements[iElement])(deltaTime);
			}
		}


		this.ui.update.bind(this.ui)(deltaTime);
	};

	this.callRender = function(deltaTime) {
		var ctx = this.getContext();
		var canvasSize = this.getCanvasSize();
		ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

		this.terrain.render.bind(this.terrain)(deltaTime);
		if(this.snakes != null) {
			for(var iSnake = 0; iSnake < this.snakeCount; iSnake++) {
				this.snakes[iSnake].render.bind(this.snakes[iSnake])(deltaTime);
			}
		}
		this.robot.render.bind(this.robot)(deltaTime);
		this.perso.render.bind(this.perso)(deltaTime);
		this.food.render.bind(this.food)(deltaTime);

		if(this.elements != null) {
			for(var iElement = 0; iElement < this.elementCount; iElement++) {
				this.elements[iElement].render.bind(this.elements[iElement])(deltaTime);
			}
		}

		this.totem.render.bind(this.totem)(deltaTime);

		this.ui.render.bind(this.ui)(deltaTime);
	};

	this.mainLoop = function() {
		var date = new Date();
		var currentTime = date.getTime();

		var deltaTime = currentTime - this.time;
		this.time = currentTime;

		this.callUpdates(deltaTime);
		this.callRender(deltaTime);

		if(this.paused == false) {
			requestAnimationFrame(this.mainLoop.bind(this));
		}
	};
}

document.addEventListener('DOMContentLoaded', function() {
  game = new Game();
  game.start();
}, false);
