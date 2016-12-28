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
  this.x = 20;
  this.y = 275;
  this.width = 100;
  this.height = 15;
}

var paddle = new Paddle();

function boundaries() {
  if (paddle.x >= canvas.width - paddle.width) {
    paddle.x = 300;
  } else if (paddle.x <= 0) {
    paddle.x = 0;
  }
}

Paddle.prototype.draw = function () {
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  return this;
}

Paddle.prototype.setDirection = function(direction) {
  console.log(direction);

    if (direction === 37) {
      this.x -= 10;
    } else if (direction === 39) {
      this.x += 10;
    }
  }

$('body').keydown(function(event) {
  var direction = event.keyCode;
  paddle.setDirection(direction);
})


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

canvas.addEventListener('keydown', function(e) {
  console.log(e.keyCode);
});


requestAnimationFrame(function gameLoop() {
  boundaries();
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  blocks.forEach(function (block) {
    block.draw();
  })
  requestAnimationFrame(gameLoop);
});
