var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Block = require('./block');
var Paddle = require('./paddle');
var Ball = require('./ball');


var blocks = [];

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
    blocks.push(new Block (context, x += 60))
  }
}
function createSecondRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (context, x += 60, 30))
  }
}
function createThirdRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (context, x += 60, 50))
  }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (context, x += 60, 70))
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
  ball.drawBall().move(paddle);
  blocks.forEach(function (block) {
    block.draw();
  })
  requestAnimationFrame(gameLoop);
});
