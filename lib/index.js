
/************************************
      global variables
 ************************************/

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const Block = require('./block');
const Paddle = require('./paddle');
const Ball = require('./ball');

let block = new Block({context: context});
let ball = new Ball({context: context, canvas: canvas});
let paddle = new Paddle({context: context, canvas: canvas});

var blocks = [];
var level = 0;
var moveBallTrigger = false;

/************************************
    directional functions
 ************************************/

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

/************************************
    collision detection & boundries
 ************************************/

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
  if ((ball.y - ball.radius) > 300) {
    resetBall();
    ball.lives --;
    $('.lives').text("Lives: " + ball.lives);
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


/************************************
      constructing levels
 ************************************/

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
 }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    var block = new Block ({context: context, x: x+= 60, y: 70});
    blocks.push(block)
  }
}

function levels() {
  resetBall();
  paddle.x = (canvas.width - 100) / 2;
  if (level === 1) {
    // createFirstRow(6);
    // createSecondRow(6);
    // createThirdRow(3);
    createFourthRow(6);
  } else if (level === 2) {
    createFirstRow(4);
    createSecondRow(4);
    createThirdRow(4);
    createFourthRow(4);
  }else if (level === 3) {
    createFirstRow(2);
    createSecondRow(2);
    createThirdRow(2);
    createFourthRow(6);
  } else {
    //winnerfunction here
  }
}

/************************************
        game play
 ************************************/

function startBall() {
  if (moveBallTrigger === true) {
    ball.move();
  }
};

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  moveBallTrigger = false;
}

function levelPass() {
  var blockHeight = blocks.every(checkHeight);
  function checkHeight(blocks) {
    if (blocks.height !== 0) {
      return false;
    } else {
      return true;
    }
  }
  if (blockHeight === true) {
    level++;
    $('.level-pass').css('display', 'flex');
    $('.level').text('Level ' + level);
    levels();
    removeMessageDisplay();
  }
}

function gameWin() {
  $('.winner').css('display', 'flex');
  levels = 0;
}

function gameOver() {
  if (ball.lives === 0) {
    $('.game-over').css('display', 'block')
    removeMessageDisplay()
    ball.lives = 3;
  }
}


function removeMessageDisplay() {
  $('.start-game').on('click', function() {
    blocks = [];
    $('.message').css('display', 'none');
    levels();
    moveBallTrigger = false;
  })
}

/************************************
      Event Listeners
 ************************************/

$('body').keydown(function(event) {
  var direction = event.keyCode;
  paddle.move(direction);
  if (direction === 32) {
    moveBallTrigger = true
  }
})

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  startBall();
  ball.drawBall();
  blocks.forEach(function (block) {
    block.draw();
    block.remove(ball, blocks)
    ballBoundries(block);
  })
  ballBoundries(paddle);
  canvasBoundries(ball, paddle);
  gameOver();
  levelPass();
  requestAnimationFrame(gameLoop);
});
