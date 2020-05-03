/**
 * Aventurier du desert, combatant sans répit
 */
function Perso() {
	var lookDown = false;
	var lookUp = false;
	var lookRight = true;
	var lookLeft = false;

	this.minDelta = 0.2;
	this.currentDelta = 0.0;

	this.speedFactor = 4;

	this.currentPosition = {
		x: 0,
		y: 0
	};

	this.nextPosition = {
		x: this.currentPosition.x,
		y: this.currentPosition.y
	};

	this.getRect = function() {
		var canvasSize = game.getCanvasSize();
		return {x: this.currentPosition.x, y: this.currentPosition.y, width: game.drawSpriteSize, height: game.drawSpriteSize};
	};

	this.onHover = function() {

	};

	this.setPosition = function(x, y, drawSpriteSize){
		this.currentPosition.x = x * drawSpriteSize;
		this.currentPosition.y = y * drawSpriteSize;

		this.nextPosition.x = this.currentPosition.x;
		this.nextPosition.y = this.currentPosition.y;
	};

	this.onClick = function(x, y) {
		console.log("print on perso");
	};

	this.collides = function(x, y) {
		if(game.food.position.x == x && game.food.position.y == y) {
			return true;
		}
		if(game.totem.position.x == x && game.totem.position.y == y) {
			return true;
		}

		for(var iElement = 0; iElement < game.elementCount; iElement++) {
			if(game.elements[iElement].position.x == x && game.elements[iElement].position.y == y) {
				return true;
			}
		}

		return false;
	}

	this.onKeyboard = function(key) {
		var spriteSize = game.drawSpriteSize;
		var canvasSize = game.getCanvasSize();

		switch(key) {
			case 90: // Z
			{
				if(this.nextPosition.y >= spriteSize && this.nextPosition.y == this.currentPosition.y) {
					if(!this.collides(this.nextPosition.x, this.nextPosition.y - spriteSize)) {
						this.nextPosition.y -= spriteSize;
					}
					lookUp = true;
					lookDown = false;
					lookLeft = false;
					lookRight = false;
				}
			}
			break;

			case 83: // S
			{
				if(this.nextPosition.y <= canvasSize.height - spriteSize * 2 && this.nextPosition.y == this.currentPosition.y) {
					if(!this.collides(this.nextPosition.x, this.nextPosition.y + spriteSize)) {
						this.nextPosition.y += spriteSize;
					}
					lookUp = false;
					lookDown = true;
					lookLeft = false;
					lookRight = false;
				}
			}
			break;

			case 81: // Q
			{
				if(this.nextPosition.x >= spriteSize && this.nextPosition.x == this.currentPosition.x) {
					if(!this.collides(this.nextPosition.x - spriteSize, this.nextPosition.y)) {
						this.nextPosition.x -= spriteSize;
					}
					lookUp = false;
					lookDown = false;
					lookLeft = true;
					lookRight = false;
				}
			}
			break;

			case 68: // D
			{
				if(this.nextPosition.x <= canvasSize.width - spriteSize * 2 && this.nextPosition.x == this.currentPosition.x) {
					if(!this.collides(this.nextPosition.x + spriteSize, this.nextPosition.y)) {
						this.nextPosition.x += spriteSize;
					}
					lookUp = false;
					lookDown = false;
					lookLeft = false;
					lookRight = true;
				}
			}
			break;

		}
	};

	this.update = function(delta) {

	};

	this.render = function(delta) {
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
				imgNumber = 74;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 73;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 74;
				} else {
					imgNumber = 75;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 3 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		if(lookDown){
			if(this.currentPosition.y == this.nextPosition.y) {
				imgNumber = 65;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 64;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 65;
				} else {
					imgNumber = 66;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 3 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		if(lookLeft){
			if(this.currentPosition.x == this.nextPosition.x) {
				imgNumber = 68;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 67;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 68;
				} else {
					imgNumber = 69;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 3 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		if(lookRight){
			if(this.currentPosition.x == this.nextPosition.x) {
				imgNumber = 71;
			} else {
				if(this.currentDelta < this.minDelta) {
					imgNumber = 70;
				} else if(this.currentDelta < this.minDelta * 2) {
					imgNumber = 71;
				} else {
					imgNumber = 72;
				}

				this.currentDelta += delta / 1000.0;
				if(this.currentDelta > 3 * this.minDelta) {
					this.currentDelta = 0.0;
				}
			}
		}

		game.drawImage(imgNumber, this.currentPosition.x, this.currentPosition.y);
	};
}
