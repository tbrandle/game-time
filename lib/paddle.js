function Paddle() {
  this.x = (canvas.width - 100) / 2;
  this.y = 275;
  this.width = 100;
  this.height = 15;

}

Paddle.prototype.draw = function () {
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
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
