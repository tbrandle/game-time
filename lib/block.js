function Block(options) {
  this.x =  options.x || 0;
  this.y =  options.y ||10;
  this.width =  options.width ||50;
  this.height =  options.height ||15;
  this.context = options.context;
  this.counter = 1;
}

Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Block.prototype.remove = function (ball, blocks) {
  if ((ball.y - ball.radius) < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x && (ball.y - ball.radius) > this.y) {
    this.counter --;
    console.log(this.counter);
  }
  if ((ball.y + ball.radius) > this.y && (ball.y + ball.radius) < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x) {
    this.counter --;
    console.log(this.counter);
  }
  if ((ball.x + ball.radius) > this.x && (ball.x + ball.radius) < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
    this.counter --;
    console.log(this.counter);
  }
  if ((ball.x - ball.radius) > this.x && (ball.x - ball.radius) < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
    this.counter --;
    console.log(this.counter);
  }
  if (this.counter === 0) {
    var index = blocks.indexOf(this);
    this.context.clearRect(this.x, this.y, this.width, this.height)
    // this.x = 0;
    // this.y = 0;
    // this.width = 0;
    // this.height = 0;
    blocks.splice(index, 1)
  }
};

module.exports = Block;
