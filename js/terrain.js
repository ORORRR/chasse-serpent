function Terrain() {
	this.sprites = null;

	this.getRect = function() {
		var canvasSize = game.getCanvasSize();
		return {x: 0, y: 0, width: canvasSize.width, height: canvasSize.height};
	};

	this.onHover = function() {

	};
	this.onClick = function(x, y) {
		console.log("print on terrain");
	};
	this.onKeyboard = function(key) {

	};
	this.update = function(delta) {
		// ...
	};

	this.render = function(delta) {
		var canvasSize = game.getCanvasSize();

		if(null == this.sprites) {
			this.sprites = [];
			for(var x = 0; x * game.drawSpriteSize < canvasSize.width; x++) {
				this.sprites[x] = [];
				for(var y = 0; y * game.drawSpriteSize < canvasSize.height; y++) {
					this.sprites[x][y] = Math.floor(Math.random() * 7);
				}
			}
		}

		for(var x = 0; x * game.drawSpriteSize < canvasSize.width; x++) {
			for(var y = 0; y * game.drawSpriteSize < canvasSize.height; y++) {
				game.drawImage(this.sprites[x][y], x * game.drawSpriteSize, y * game.drawSpriteSize);
			}
		}
	};
}
