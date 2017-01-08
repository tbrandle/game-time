const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const Block = require('./block');
const Paddle = require('./paddle');
const Ball = require('./ball');

let block = new Block({context: context});
let ball = new Ball({context: context, canvas: canvas});
let paddle = new Paddle({context: context, canvas: canvas});

var blocks = [];

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

function canvasBoundries(ball, paddle) {
  if ((ball.y - ball.radius) <= 0 ) {
    ball.y = ball.radius;
    down(ball);
  }
  if ((ball.x + ball.radius) > canvas.width){
    ball.x = canvas.width - ball.radius;
    left(ball);
  }
  if ((ball.x - ball.radius) < 0){
    ball.x = ball.radius;
    right(ball);
  }
  if (paddle.x >= canvas.width - paddle.width) {
    paddle.x = 300;
  } else if (paddle.x <= 0) {
    paddle.x = 0;
  }
}

function ballBoundries(object) {
  if ((ball.y - ball.radius) < object.y + object.height && ball.x < object.x + object.width && ball.x > object.x && (ball.y - ball.radius) > object.y) {
    ball.y = ball.y + ball.radius;
    down(ball);
  }
  if ((ball.y + ball.radius) > object.y && (ball.y + ball.radius) < object.y + object.height && ball.x < object.x + object.width && ball.x > object.x) {
    ball.y = ball.y - ball.radius;
    up(ball);
  }
  if ((ball.x + ball.radius) > object.x && (ball.x + ball.radius) < object.x + object.width && ball.y > object.y && ball.y < object.y + object.height) {
    ball.x = ball.x - ball.radius;
    left(ball);
  }
  if ((ball.x - ball.radius) > object.x && (ball.x - ball.radius) < object.x + object.width && ball.y > object.y && ball.y < object.y + object.height) {
    ball.x = ball.x + ball.radius;
    right(ball);
  }
}

function createFirstRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block ({context: context, x: x+= 60}))
  }
}
function createSecondRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block ({context: context, x: x+= 60, y: 30}))
  }
}
function createThirdRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block ({context: context, x: x+= 100, y: 50}))
  }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block ({context: context, x: x+= 60, y: 70}))
  }
}


createFirstRow(6);
createSecondRow(6);
createThirdRow(3);
createFourthRow(6);


//Event Listeners
var trigger = false;

$('body').keydown(function(event) {
  var direction = event.keyCode;
  paddle.move(direction);
  if (direction === 32) {
    trigger = true
  }
})

function resetBall() {
    if ((ball.y - ball.radius) > 300) {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.lives --;
      trigger = false;
      console.log(ball.lives);
    }
    if (trigger === true) {
      ball.speed = 2;
      ball.move();
    }
  };

function resetGame() {
  if (ball.lives === 0) {
    alert("Game Over");
    ball.lives = 3;
    blocks = [];
    createFirstRow(6);
    createSecondRow(6);
    createThirdRow(3);
    createFourthRow(6);
    trigger = false;
  }
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  resetBall()
  ball.drawBall();
  blocks.forEach(function (block) {
    block.draw();
    block.remove(ball, blocks)
    ballBoundries(block);
  })
  ballBoundries(paddle);
  canvasBoundries(ball, paddle);
  resetGame();
  requestAnimationFrame(gameLoop);
});
