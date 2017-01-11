// const canvas = document.getElementById('game');
// const context = canvas.getContext('2d');

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
  var ball = this;
  $('body').keydown(function(event) {
    var direction = event.keyCode;
    if (direction === 32) {
      ball.moveBallTrigger = true;
    }
  })
  if (this.moveBallTrigger === true && this.startGameTrigger === true) {
    ball.move();
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

Ball.prototype.canvasBoundries = function () {
  if ((this.y - this.radius) <= 0 ) {
    this.y = this.radius;
    this.down();
  }
  if ((this.x + this.radius) > canvas.width){
    this.x = canvas.width - this.radius;
    this.left();
  }
  if ((this.x - this.radius) < 0){
    this.x = this.radius;
    this.right();
  }
  if ((this.y - this.radius) > 300) {
    this.resetBall();
    this.lives --;
  }
};

Ball.prototype.ballBoundries = function (object) {
  if ((this.y - this.radius) < object.y + object.height && this.x < object.x + object.width && this.x > object.x && (this.y - this.radius) > object.y) {
    this.y = this.y + this.radius;
    this.down();
    if(object.type === "block"){
      object.remove(this);
    }
  }
  if ((this.y + this.radius) > object.y && (this.y + this.radius) < object.y + object.height && this.x < object.x + object.width && this.x > object.x) {
    this.y = this.y - this.radius;
    this.up();
    if(object.type === "block"){
      object.remove(this);
    }
  }
  if ((this.x + this.radius) > object.x && (this.x + this.radius) < object.x + object.width && this.y > object.y && this.y < object.y + object.height) {
    this.x = this.x - this.radius;
    this.left();
    if(object.type === "block"){
      object.remove(this);
    }
  }
  if ((this.x - this.radius) > object.x && (this.x - this.radius) < object.x + object.width && this.y > object.y && this.y < object.y + object.height) {
    this.x = this.x + this.radius;
    this.right();
    if(object.type === "block"){
      object.remove(this);
    }
  }
}

module.exports = Ball;
