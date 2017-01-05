const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const Block = require('./block');
const Paddle = require('./paddle');
const Ball = require('./ball');

let block = new Block({context: context});
let ball = new Ball({context: context, canvas: canvas});
let paddle = new Paddle({context: context, canvas: canvas});


var blocks = [];

// var paddle = new Paddle();
// var ball = new Ball();


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
    left(ball);
  }
 if ((ball.x - ball.radius) < 0){
    ball.x = ball.radius;
    right(ball);
  }
 if ((ball.y + ball.radius) > paddle.y && paddle.x + paddle.width > (ball.x + ball.radius) && (ball.x - ball.radius)> paddle.x && (ball.y + ball.radius) < paddle.y + paddle.height) {
    up(ball);
  }
}

function blockBoundries(block) {
  if ((ball.y - ball.radius) <= block.y + block.height && (ball.x + ball.radius) < block.x + block.width && (ball.x) > block.x && (ball.y - ball.radius) > block.y) {
    ball.y = ball.y + ball.radius;
    down(ball);
  }
  if ((ball.x + ball.radius) > block.x && (ball.x + ball.radius) < block.x + block.width && ball.y > block.y && ball.y < block.y + block.height) {
    ball.x = ball.x + ball.radius;
    left(ball);
  }
  // if ((ball.x + ball.radius) <= block.y + block.height && (ball.x + ball.radius) > block.x + block.width && (ball.x + ball.radius) > block.x && (ball.y + ball.radius) > block.y) {
  //    ball.x = ball.x - ball.radius;
  //    left(ball);
  //  }
  if ((ball.x - ball.radius) < block.x + block.height && (ball.y - ball.radius) > block.y && (ball.y + ball.radius) < block.y + block.height) {
    ball.x = ball.x - ball.radius;
    right(ball);
  }
 // if ((ball.x - ball.radius) < 0){
 //    ball.x = ball.radius;
 //    right(ball);
 //  }
 if ((ball.y + ball.radius) > block.y && block.x + block.width > (ball.x + ball.radius) && (ball.x - ball.radius) > block.x && (ball.y + ball.radius) < block.y + block.height) {
    up(ball);
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
  this.x = 50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (context, x += 60, 50))
  }
}
function createFourthRow(num) {
  this.x = 40
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (context, x += 60, 70))
  }
}

// createFirstRow(6);
// createSecondRow(6);
createThirdRow(4);
createFourthRow(4);


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
