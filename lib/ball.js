  function Ball(options) {
  this.x = options.canvas.width/2;
  this.y = options.canvas.height/2;
  this.radius = 6;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.context = options.context;
  this.speed = 2;
  this.dx = this.speed;
  this.dy = -this.speed;
}

Ball.prototype.drawBall = function () {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  this.context.fill();
  this.context.closePath();
  return this;
}

Ball.prototype.move = function () {
  // this.drawBall();
  this.x += this.dx;
  this.y += this.dy;
  return this;
};

module.exports = Ball;
