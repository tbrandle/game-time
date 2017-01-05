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

function ballBoundries(block) {
  if ((ball.y - ball.radius) < block.y + block.height && ball.x < block.x + block.width && ball.x > block.x && (ball.y - ball.radius) > block.y) {
    ball.y = ball.y + ball.radius;
    down(ball);
  }
  if ((ball.y + ball.radius) > block.y && (ball.y + ball.radius) < block.y + block.height && ball.x < block.x + block.width && ball.x > block.x) {
    ball.y = ball.y - ball.radius;
    up(ball);
  }
  if ((ball.x + ball.radius) > block.x && (ball.x + ball.radius) < block.x + block.width && ball.y > block.y && ball.y < block.y + block.height) {
    ball.x = ball.x - ball.radius;
    left(ball);
  }
  if ((ball.x - ball.radius) > block.x && (ball.x - ball.radius) < block.x + block.width && ball.y > block.y && ball.y < block.y + block.height) {
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
    blocks.push(new Block ({context: context, x: x+= 100, y: 50, height: 60, width: 60}))
  }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block ({context: context, x: x+= 60, y: 70}))
  }
}

// createFirstRow(6);
// createSecondRow(6);
createThirdRow(3);
// createFourthRow(6);


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
    ballBoundries(block);
    ballBoundries(paddle);
  })
  canvasBoundries(ball, paddle);
  requestAnimationFrame(gameLoop);
});
