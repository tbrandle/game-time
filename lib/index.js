var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Block = require('./block');
var Paddle = require('./paddle');
var Ball = require('./ball');


var blocks = [];

var paddle = new Paddle();
var ball = new Ball();


function paddleBoundaries() {
  if (paddle.x >= canvas.width - paddle.width) {
    paddle.x = 300;
  } else if (paddle.x <= 0) {
    paddle.x = 0;
  }
}

function up(obj) {
  obj.dy = -obj.speed;
}

function down(obj) {
  obj.dy = obj.speed;
}

function right(obj) {
  obj.dx = obj.speed;
}

function left(obj) {
  obj.dx = -obj.speed;
}

function ballBoundries() {
  if ((ball.y - ball.radius) <= 0 ) {
    ball.y = ball.radius;
    down(ball);
  }
 if ((ball.x + ball.radius) > canvas.width){
    ball.x = canvas.width - ball.radius;
    left(ball)
  }
 if ((ball.x - ball.radius) < 0){
    ball.x = ball.radius;
    right(ball)
  }
 if ((ball.y + ball.radius) > paddle.y && paddle.x + paddle.width > (ball.x + ball.radius) && (ball.x - ball.radius)> paddle.x && (ball.y + ball.radius) < paddle.y + paddle.height) {
    up(ball);
  }
}

function blockBoundries(block) {
    if (ball.y <= block.bottomLeft && block.bottomRight >= ball.x && ball.x >= block.bottomLeft) {
      ball.dy = -ball.dy;
    }
    if (ball.y > block.x && topRight > ball.x && ball.x > block.x) {
      ball.dy = -ball.dy;
    }
    if (ball.x > bottomLeft && ball.y < bottomLeft && ball.y > topLeft) {
      ball.dx = -ball.dx;
    }
    if (ball.x < bottomRight && ball.y < bottomRight && ball.y > topRight) {
      ball.dx = -ball.dx;
    }
  })
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
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  ball.drawBall().move();
  blocks.forEach(function (block) {
    block.draw();
    blockBoundries(block);
  })
  paddleBoundaries();
  ballBoundries();
  requestAnimationFrame(gameLoop);
});
