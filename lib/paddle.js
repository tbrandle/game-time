function Paddle(options) {
  this.x = (options.canvas.width - 100) / 2;
  this.y = 275;
  this.width = 100;
  this.height = 15;
  this.context = options.context;
  this.color = '#000000';
}

Paddle.prototype.draw = function () {
  this.context.fillStyle = this.color;
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Paddle.prototype.move = function(direction) {
  if (direction === 37) {
    this.x -= 25;
  } else if (direction === 39) {
    this.x += 25;
  }
}

module.exports = Paddle;
