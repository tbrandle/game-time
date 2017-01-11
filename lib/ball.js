const canvas = document.getElementById('game');
const context = canvas.getContext('2d');



function Ball(options) {
  this.x = 200;
  this.y = 260;
  this.radius = 6;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.context = options.context;
  this.speed = 3;
  this.dx = this.speed;
  this.dy = -this.speed;
  this.lives = 3;
  this.gameScore = 0;
  this.color = '#000000';
  this.moveBallTrigger = false;
  this.startGameTrigger = false;
}

Ball.prototype.drawBall = function () {
  this.context.fillStyle = this.color;
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  this.context.fill();
  this.context.closePath();
  return this;
}

Ball.prototype.move = function () {
  this.x += this.dx;
  this.y += this.dy;
  return this;
};

Ball.prototype.resetBall = function() {
  this.x = 200;
  this.y = 260;
  this.moveBallTrigger = false;
}

Ball.prototype.startBall = function() {
  if (this.moveBallTrigger === true && this.startGameTrigger === true) {
    this.move();
  }
}

Ball.prototype.up = function() {
  this.dy = -this.speed;
}

Ball.prototype.down = function () {
  this.dy = this.speed;
};

Ball.prototype.right = function () {
  this.dx = this.speed;
};

Ball.prototype.left = function () {
  this.dx = -this.speed;
};

module.exports = Ball;
