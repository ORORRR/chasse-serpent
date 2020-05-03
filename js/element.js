function Element() {
	this.sprite = Math.floor(Math.random() * 4) + 224;
	this.position = {x: -1, y: -1};

	this.setPosition = function(x, y) {
		this.position.x = x;
		this.position.y = y;
	};

	this.getRect = function() {
		return {x: this.position.x, y: this.position.y, width: game.drawSpriteSize, height: game.drawSpriteSize};
	};

	this.onHover = function() {

	};
	this.onClick = function(x, y) {

	};
	this.onKeyboard = function(key) {

	};
	this.update = function(delta) {
		// ...
	};

	this.render = function(delta) {
		game.drawImage(this.sprite - game.sheetSize, this.position.x, this.position.y - game.drawSpriteSize);
		game.drawImage(this.sprite, this.position.x, this.position.y);
	};
}
