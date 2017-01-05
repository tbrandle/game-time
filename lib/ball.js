var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Ball() {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.radius = 6;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.speed = 2;
  this.dx = this.speed;
  this.dy = -this.speed;
}

Ball.prototype.drawBall = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  context.fill();
  context.closePath();
  return this;
}

Ball.prototype.move = function () {
  this.drawBall();
  this.x += this.dx;
  this.y += this.dy;
  return this;
};

module.exports = Ball;
