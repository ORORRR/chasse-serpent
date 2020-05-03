/**
 * Le totem destructeur.
 * Mais aide-t-il vraiment l'explorateur ?
 */
function Totem() {
	this.position = {x: 9 * 64, y: 4 * 64};

	this.currentTime = 0;
	this.sleepTime = 20000;
	this.angryTime = 1000;
	this.chaosTime = 2000;
	this.chaosAlternanceTime = 100;

	this.blinker = 0;

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
		this.currentTime += delta;
		this.blinker = (this.blinker + delta) % (this.chaosAlternanceTime * 2);
		if(this.currentTime >= this.sleepTime + this.angryTime + this.angryTime + this.chaosTime) {
			this.currentTime = 0;

			var canvasSize = game.getCanvasSize();
			for(var iSnake = 0; iSnake < game.snakeCount; iSnake++) {
				game.ui.incNumberOfKill();
				game.snakes[iSnake].killedPosition = {x: game.snakes[iSnake].currentPosition.x, y: game.snakes[iSnake].currentPosition.y};
				game.snakes[iSnake].killed = true;

				if(Math.floor(Math.random() * 2) == 0) {
					var c = Math.floor(Math.random() * canvasSize.height / game.drawSpriteSize) * 2;
					var test = c - canvasSize.height / game.drawSpriteSize;
					if(c < canvasSize.height / game.drawSpriteSize) {
						game.snakes[iSnake].setPosition(0, c * game.drawSpriteSize);
					} else {
						game.snakes[iSnake].setPosition(canvasSize.width - game.drawSpriteSize, (c - canvasSize.height / game.drawSpriteSize) * game.drawSpriteSize);
					}
				} else {
					var c = Math.floor(Math.random() * canvasSize.width / game.drawSpriteSize) * 2;
					var test = c - canvasSize.width / game.drawSpriteSize;
					if(c < canvasSize.width / game.drawSpriteSize) {
						game.snakes[iSnake].setPosition(c * game.drawSpriteSize, 0);
					} else {
						game.snakes[iSnake].setPosition((c - canvasSize.height / game.drawSpriteSize) * game.drawSpriteSize, canvasSize.width - game.drawSpriteSize);
					}

				}
			}
		}
	};

	this.render = function(delta) {

		if(this.currentTime < this.sleepTime) {
			game.drawImage(416, this.position.x, this.position.y - game.drawSpriteSize);
			game.drawImage(448, this.position.x, this.position.y);
		} else if(this.currentTime < this.sleepTime + this.angryTime) {
			game.drawImage(417, this.position.x, this.position.y - game.drawSpriteSize);
			game.drawImage(449, this.position.x, this.position.y);
		} else if(this.currentTime < this.sleepTime + this.angryTime + this.angryTime) {
			game.drawImage(418, this.position.x, this.position.y - game.drawSpriteSize);
			game.drawImage(450, this.position.x, this.position.y);
		} else if(this.currentTime < this.sleepTime + this.angryTime + this.angryTime + this.chaosTime) {
			if(this.blinker < this.chaosAlternanceTime) {
				game.drawImage(420, this.position.x - game.drawSpriteSize, this.position.y - 2 * game.drawSpriteSize);
				game.drawImage(452, this.position.x - game.drawSpriteSize, this.position.y - game.drawSpriteSize);
				game.drawImage(484, this.position.x - game.drawSpriteSize, this.position.y);

				game.drawImage(421, this.position.x, this.position.y - 2 * game.drawSpriteSize);
				game.drawImage(453, this.position.x, this.position.y - game.drawSpriteSize);
				game.drawImage(485, this.position.x, this.position.y);

				game.drawImage(422, this.position.x + game.drawSpriteSize, this.position.y - 2 * game.drawSpriteSize);
				game.drawImage(454, this.position.x + game.drawSpriteSize, this.position.y - game.drawSpriteSize);
				game.drawImage(486, this.position.x + game.drawSpriteSize, this.position.y);
			} else {
				game.drawImage(423, this.position.x - game.drawSpriteSize, this.position.y - 2 * game.drawSpriteSize);
				game.drawImage(455, this.position.x - game.drawSpriteSize, this.position.y - game.drawSpriteSize);
				game.drawImage(487, this.position.x - game.drawSpriteSize, this.position.y);

				game.drawImage(424, this.position.x, this.position.y - 2 * game.drawSpriteSize);
				game.drawImage(456, this.position.x, this.position.y - game.drawSpriteSize);
				game.drawImage(488, this.position.x, this.position.y);

				game.drawImage(425, this.position.x + game.drawSpriteSize, this.position.y - 2 * game.drawSpriteSize);
				game.drawImage(457, this.position.x + game.drawSpriteSize, this.position.y - game.drawSpriteSize);
				game.drawImage(489, this.position.x + game.drawSpriteSize, this.position.y);

			}
		}

	};
}
