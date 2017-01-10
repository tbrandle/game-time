function Block(options) {
  this.x =  options.x || 0;
  this.y =  options.y || 10;
  this.width =  options.width || 50;
  this.height =  options.height || 15;
  this.counter =  options.counter || 1;
  this.context = options.context;
  this.color = '#000000';
}

Block.prototype.draw = function () {
  this.context.fillStyle = this.color;
  if (this.counter === 3) {
    this.color = "#ff0000"
  }
  if (this.counter === 2) {
    this.color = "#ffa500"
  }
  if (this.counter === 1) {
    this.color = "#000000"
  }
  this.context.fillRect(this.x, this.y, this.width, this.height);
    return this;
}

Block.prototype.remove = function (ball, blocks) {
  if (this.counter <= 0) {
    this.context.clearRect(this.x, this.y, this.width, this.height)
    this.height = 0;
  }
  if ((ball.y - ball.radius) < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x && (ball.y - ball.radius) > this.y) {
    ball.gameScore += 10;
    this.counter --;
    ball.gameScore += 10;
  }
  if ((ball.y + ball.radius) > this.y && (ball.y + ball.radius) < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x) {
    ball.gameScore += 10;
    this.counter --;
    ball.gameScore += 10;
  }
  if ((ball.x + ball.radius) > this.x && (ball.x + ball.radius) < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
    ball.gameScore += 10;
    this.counter --;
    ball.gameScore += 10;
  }
  if ((ball.x - ball.radius) > this.x && (ball.x - ball.radius) < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
    ball.gameScore += 10;
    this.counter --;
    ball.gameScore += 10;
  }
};

module.exports = Block;
