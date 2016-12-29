var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var blocks = []

function Block(x, y, width, height) {
  this.x = x || 0;
  this.y = y || 10;
  this.width = width || 50;
  this.height = height || 15;
}

Block.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

function Paddle() {
  this.x = canvas.width / 2;
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
    this.x -= 15;
  } else if (direction === 39) {
    this.x += 15;
  }
}

function Ball() {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.radius = 6;
  this.startAngle = 0
  this.endAngle = 2 * Math.PI
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
  } else if (this.x >= canvas.width || this.x <= 0){
    this.dx= -this.dx;
  } else if (this.y === paddle.y && paddle.x + paddle.width > this.x && this.x > paddle.x) {
    this.dy= -this.dy;
  }
  return this;
};

var paddle = new Paddle();
var ball = new Ball();

function boundaries() {
  if (paddle.x >= canvas.width - paddle.width) {
    paddle.x = 300;
  } else if (paddle.x <= 0) {
    paddle.x = 0;
  }
}

function createFirstRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60))
  }
}
function createSecondRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60, 30))
  }
}
function createThirdRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60, 50))
  }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60, 70))
  }
}

createFirstRow(6);
createSecondRow(6);
createThirdRow(6)
createFourthRow(6)


//Event Listeners

$('body').keydown(function(event) {
  var direction = event.keyCode;
  paddle.move(direction);
})

requestAnimationFrame(function gameLoop() {
  boundaries();
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  ball.drawBall().move();
  blocks.forEach(function (block) {
    block.draw();
  })
  requestAnimationFrame(gameLoop);
});
