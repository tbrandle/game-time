var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


function Block(context, x, y, width, height) {
  this.x = x || 0;
  this.y = y || 10;
  this.width = width || 50;
  this.height = height || 15;
  this.context = context;
}

Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

module.exports = Block;
