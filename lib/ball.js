function Ball() {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.radius = 6;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.dx = 5;
  this.dy = -5;
}

Ball.prototype.drawBall = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  context.fill();
  context.closePath();
  return this;
}

Ball.prototype.move = function () {
  ball.drawBall();
  this.x += this.dx;
  this.y += this.dy;
  if (this.y <= 0 ) {
    this.dy = -this.dy;
  } else if (this.x > canvas.width || this.x < 0){
    this.dx= -this.dx;
  } else if (this.y === paddle.y && paddle.x + paddle.width > this.x && this.x > paddle.x) {
    this.dy= -this.dy;
  }
  return this;
};

module.exports = Ball;
