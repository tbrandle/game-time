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
    var block = new Block ({context: context, x: x += 60})
    blocks.push(block)
  }
}
function createSecondRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    var block = new Block ({context: context, x: x+= 60, y: 30})
    blocks.push(block)
  }
}
function createThirdRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    var block = new Block ({context: context, x: x+= 100, y: 50, counter: 3})
    blocks.push(block)
    console.log(block);
    console.log(block.counter);
    // block.blockColor()
 }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block ({context: context, x: x+= 60, y: 70}))
  }
}

function winGame() {
  var blockHeight = blocks.every(checkHeight);
  function checkHeight(blocks) {
    if (blocks.height !== 0) {
      return false;
    } else {
      return true;
    }
  }
  if (blockHeight === true) {
    console.log('you win');
  }
}

function resetBall() {
  $('.lives').text("Lives: " + ball.lives);

  if ((ball.y - ball.radius) > 300) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.lives --;
    trigger = false;
    console.log(ball.lives);
  }
  if (trigger === true) {
    ball.speed = 5;
    ball.move();
  }
};

function gameOverDisplay() {
  var gameOverImg = $('.game-over');
  gameOverImg.css('display', 'block')
  $('.start-new-game').on('click', function () {
    blocks = [];
    gameOverImg.css('display', 'none')
    createFirstRow(6);
    createSecondRow(6);
    createThirdRow(3);
    createFourthRow(6);
    paddle.x = (canvas.width - 100) / 2;
    trigger = false;
  })
}

function winnerImgDisplay() {

}

function resetGame() {
  if (ball.lives === 0) {
    gameOverDisplay()
    ball.lives = 3;
    // createFirstRow(6);
    // createSecondRow(6);
    // createThirdRow(3);
    // createFourthRow(6);
    // paddle.x = (canvas.width - 100) / 2;
    // trigger = false;
  }
}

 /*** levels ***/

function Level() {
    this.status = 1
}


 function level1 (){
   createFirstRow(6);
   createSecondRow(6);
   createThirdRow(3);
   createFourthRow(6);

 }
function level2() {
  createFirstRow(2);
  createSecondRow(2);
  createThirdRow(2);
  createFourthRow(2);
}







//Event Listeners
var trigger = false;

level1 ();

$('body').keydown(function(event) {
  var direction = event.keyCode;
  paddle.move(direction);
  if (direction === 32) {
    trigger = true
  }
})

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
  winGame();
  requestAnimationFrame(gameLoop);
});
