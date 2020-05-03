/**
 * Protégons la nourriture convoitée par les serpents !!!
 */
function Food() {
	this.position = {x: 0, y: 0};
	this.life = 0;

	this.sprite = 256;

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
		if(this.life >= 4) {
			game.isOver = true;
		}
	};

	this.render = function(delta) {
		game.drawImage(this.sprite + this.life, this.position.x, this.position.y);
	};
}
