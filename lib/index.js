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

var paddle = new Object();
  paddle.x = 20;
  paddle.y = 275;
  paddle.width = 100;
  paddle.height = 15;
  paddle.velocity = 0;

Object.prototype.draw = function () {
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  return this;
}

Object.prototype.setDirection = function(direction) {
  console.log(direction);
  
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
  context.clearRect(0, 0, canvas.width, canvas.height);
  Object.draw();
  blocks.forEach(function (block) {
    block.draw();
  })
  requestAnimationFrame(gameLoop);
});
