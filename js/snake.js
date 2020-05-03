/**
 * Les serpents, complètement bien fait
 */
function Snake() {
	var lookDown = false;
	var lookUp = false;
	var lookRight = true;
	var lookLeft = false;

	this.minDelta = 0.2;
	this.currentDelta = 0.0;

	this.currentPosition = {x: 0, y: 0};
	this.nextPosition = {x: 0, y: 0};
	this.life = 0;

	this.color = Math.floor(Math.random() * 3);

	this.speedFactor = 1;

	this.killedPosition = null;
	this.killed = false;
	this.smokeTime = 200;
	this.currentSmokeTime = 0;

	this.setPosition = function(x, y) {
		this.currentPosition.x = x;
		this.nextPosition.x = x;
		this.currentPosition.y = y;
		this.nextPosition.y = y;
	}

	this.getRect = function() {
		var canvasSize = game.getCanvasSize();
		return {x: this.position.x, y: this.position.x, width: canvasSize.width, height: canvasSize.height};
	};

	this.onHover = function() {

	};
	this.onClick = function(x, y) {

	};
	this.onKeyboard = function(key) {

	};
	this.update = function(delta) {
		if(this.killed) {
			this.currentSmokeTime += delta;
		}

		if(this.currentSmokeTime > this.smokeTime) {
			this.currentSmokeTime = 0;
			this.killed = false;
			this.killedPosition = null;
		}

		if((Math.floor(this.currentPosition.x / game.drawSpriteSize) * game.drawSpriteSize == Math.floor(game.perso.nextPosition.x / game.drawSpriteSize) * game.drawSpriteSize
			&& Math.floor(this.currentPosition.y / game.drawSpriteSize) * game.drawSpriteSize == Math.floor(game.perso.nextPosition.y / game.drawSpriteSize) * game.drawSpriteSize) ||
			Math.floor(this.currentPosition.x / game.drawSpriteSize) * game.drawSpriteSize == Math.floor(game.robot.nextPosition.x / game.drawSpriteSize) * game.drawSpriteSize
				&& Math.floor(this.currentPosition.y / game.drawSpriteSize) * game.drawSpriteSize == Math.floor(game.robot.nextPosition.y / game.drawSpriteSize) * game.drawSpriteSize) {

				this.killedPosition = {x: this.currentPosition.x, y: this.currentPosition.y};
				this.killed = true;

				var canvasSize = game.getCanvasSize();
				if(Math.floor(Math.random() * 2) == 0) {
					var c = Math.floor(Math.random() * canvasSize.height / game.drawSpriteSize) * 2;
					if(c < canvasSize.height / game.drawSpriteSize) {
						this.setPosition(0, c * game.drawSpriteSize);
					} else {
						this.setPosition(canvasSize.width - game.drawSpriteSize, (c - canvasSize.height / game.drawSpriteSize) * game.drawSpriteSize);
					}
				} else {
					var c = Math.floor(Math.random() * canvasSize.width / game.drawSpriteSize) * 2;
					if(c < canvasSize.width / game.drawSpriteSize) {
						this.setPosition(0, c * game.drawSpriteSize);
					} else {
						this.setPosition((c - canvasSize.width / game.drawSpriteSize) * game.drawSpriteSize, canvasSize.height - game.drawSpriteSize);
					}
				}

				game.ui.incNumberOfKill();
				game.addSnake();
		}

		if(this.nextPosition.x == this.currentPosition.x && this.nextPosition.y == this.currentPosition.y) {
			var destination = game.food.position;

			if(this.nextPosition.x == destination.x && this.nextPosition.y == destination.y) {
				var canvasSize = game.getCanvasSize();
				if(Math.floor(Math.random() * 2) == 0) {
					var c = Math.floor(Math.random() * canvasSize.height / game.drawSpriteSize) * 2;
					if(c < canvasSize.height / game.drawSpriteSize) {
						this.setPosition(0, c * game.drawSpriteSize);
					} else {
						this.setPosition(canvasSize.width - game.drawSpriteSize, (c - canvasSize.height / game.drawSpriteSize) * game.drawSpriteSize);
					}
				} else {
					var c = Math.floor(Math.random() * canvasSize.width / game.drawSpriteSize) * 2;
					if(c < canvasSize.width / game.drawSpriteSize) {
						this.setPosition(0, c * game.drawSpriteSize);
					} else {
						this.setPosition((c - canvasSize.width / game.drawSpriteSize) * game.drawSpriteSize, canvasSize.height - game.drawSpriteSize);
					}
				}

				game.food.life++;
				return;
			}

			if(Math.floor(Math.random() * 2) == 0) {
				if(destination.x > this.nextPosition.x) {
					this.nextPosition.x += game.drawSpriteSize;
					lookUp = false;
					lookDown = false;
					lookLeft = false;
					lookRight = true;
				} else if(destination.x < this.nextPosition.x) {
					this.nextPosition.x -= game.drawSpriteSize;
					lookUp = false;
					lookDown = false;
					lookLeft = true;
					lookRight = false;
				}
			} else {
				if(destination.y > this.nextPosition.y) {
					this.nextPosition.y += game.drawSpriteSize;
					lookUp = false;
					lookDown = true;
					lookLeft = false;
					lookRight = false;
				} else if(destination.y < this.nextPosition.y) {
					this.nextPosition.y -= game.drawSpriteSize;
					lookUp = true;
					lookDown = false;
					lookLeft = false;
					lookRight = false;
				}
			}

		}
	};

	this.render = function(delta) {

		if(this.killed) {
			if(this.color == 0) {
				game.drawImage(386, this.killedPosition.x, this.killedPosition.y);
			} else if(this.color == 1) {
				game.drawImage(385, this.killedPosition.x, this.killedPosition.y);
			} else {
				game.drawImage(384, this.killedPosition.x, this.killedPosition.y);
			}
		}

		if(this.currentPosition.x < this.nextPosition.x) {
			this.currentPosition.x += this.speedFactor;
		} else if(this.currentPosition.x > this.nextPosition.x) {
			this.currentPosition.x -= this.speedFactor;
		}

		if(this.currentPosition.y < this.nextPosition.y) {
			this.currentPosition.y += this.speedFactor;
		} else if(this.currentPosition.y > this.nextPosition.y) {
			this.currentPosition.y -= this.speedFactor;
		}

		var imgNumber;

		if(lookUp){
			if(this.currentPosition.y == this.nextPosition.y) {
				imgNumber = 291;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 292;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 293;
				} else if(this.currentDelta < this.minDelta * 3) {
					imgNumber = 292;
				} else {
					imgNumber = 291;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 4 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		if(lookDown){
			if(this.currentPosition.y == this.nextPosition.y) {
				imgNumber = 294;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 295;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 296;
				} else if(this.currentDelta < this.minDelta * 3) {
					imgNumber = 295;
				} else {
					imgNumber = 294;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 4 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		if(lookLeft) {
			if(this.currentPosition.x == this.nextPosition.x) {
				imgNumber = 297;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 298;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 299;
				} else if(this.currentDelta < this.minDelta * 3) {
					imgNumber = 298;
				} else {
					imgNumber = 297;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 4 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		if(lookRight){
			if(this.currentPosition.x == this.nextPosition.x) {
				imgNumber = 288;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 289;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 290;
				} else if(this.currentDelta < this.minDelta * 3) {
					imgNumber = 289;
				} else {
					imgNumber = 288;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 4 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		game.drawImage(imgNumber + this.color * game.sheetSize, this.currentPosition.x, this.currentPosition.y);

	};
}
