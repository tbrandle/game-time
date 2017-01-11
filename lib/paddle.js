

function Paddle(options) {
  this.x = 150;
  this.y = 275;
  this.width = 100;
  this.height = 10;
  this.context = options.context;
  this.color = '#91c09e';
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
    return this;
}

Paddle.prototype.canvasBoundries = function (options) {
  if (this.x >= 300) {
    this.x = 300;
  } else if (this.x <= 0) {
    this.x = 0;
  }
};

module.exports = Paddle;
