
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
var gameScore = 0;
var moveBallTrigger = false;
var startGameTrigger = false;

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
    console.log(blocks);

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
// function blockColor(block) {
//     if (block.counter === 3) {
//       block.context.fillStyle = "#ff0000"
//       // console.log("hi");
//     }
//   }


function createFirstRow(obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter})
    blocks.push(block)
  }
}
function createSecondRow(obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter})
    blocks.push(block)
  }
}
function createThirdRow(obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter})
    blocks.push(block)
  }
}
function createFourthRow(obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter})
    blocks.push(block)
  }
}

function levels() {
  resetBall();
  paddle.x = (canvas.width - 100) / 2;
  if (level === 1) {
    createFirstRow({num: 3, xStart: -100, spacing: 130, yStart: 10, height: 15, counter: 3});
    createThirdRow({num: 3, xStart: 0, spacing: 80, yStart: 50, height: 15, counter: 1});
    createFourthRow({num: 1, xStart: 60, spacing: 100, yStart: 90, height: 15, counter: 1});
  } else if (level === 2) {
    createFirstRow({num: 7, xStart: -60, spacing: 60, yStart: 10, height: 15, counter: 1});
    createSecondRow({num: 2, xStart: 0, spacing: 120, yStart: 30, height: 15, counter: 1});
    createThirdRow({num: 2, xStart: 0, spacing: 120, yStart: 50, height: 15, counter: 1});
    createFourthRow({num: 7, xStart: -60, spacing: 60, yStart: 70, height: 15, counter: 2});
  }else if (level === 3) {
    createFirstRow({num: 7, xStart: -60, spacing: 60, yStart: 10, height: 15, counter: 1});
    createSecondRow({num: 7, xStart: -60, spacing: 60, yStart: 30, height: 15, counter: 1});
    createThirdRow({num: 7, xStart: -60, spacing: 60, yStart: 50, height: 15, counter: 1});
    createFourthRow({num: 7, xStart: -60, spacing: 60, yStart: 70, height: 15, counter: 1});
  }
}


/************************************
        game play
 ************************************/

function startBall() {
  if (moveBallTrigger === true && startGameTrigger === true) {
    ball.move();
  }
};

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  moveBallTrigger = false;
};

function levelPass() {
  var blockHeight = blocks.every(checkHeight);
  function checkHeight(blocks) {
    if (blocks.height !== 0) {
      return false;
    } else {
      return true;
    }
  }
  if (blockHeight === true && level < 3 && level >= 0) {
    level++;
    startGameTrigger = false;
    $('.level-pass').css('display', 'flex');
    $('.level').text('Level ' + level);
    levels();
    removeMessageDisplay();
  } else if (blockHeight === true && level === 3) {
      $('.winner').css('display', 'flex');
      $('.level-pass').css('display', 'none');
      resetGame();
    }
  }

function resetGame() {
  $('.start-new-game').on('click', function() {
    blocks = [];
    $('.message').css('display', 'none');
    moveBallTrigger = false;
    ball.lives = 3;
    ball.gameScore = 0
    level = 0;
  })
}

function gameOver() {
  if (ball.lives === 0) {
    $('.game-over').css('display', 'flex')
    removeMessageDisplay();
    resetGame();
    ball.lives = 3;
  }
}

function removeMessageDisplay() {
  $('.start-game').on('click', function() {
    // blocks = [];
    $('.message').css('display', 'none');
    moveBallTrigger = false;
    startGameTrigger = true;
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
  $('.lives').text("Lives: " + ball.lives);
  $('.score').text("Score: " + ball.score);

  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  startBall();
  ball.drawBall();
  blocks.forEach(function (block) {
    block.draw()
    block.remove(ball, blocks)
    ballBoundries(block);
  })
  ballBoundries(paddle);
  canvasBoundries(ball, paddle);
  gameOver();
  levelPass();
  requestAnimationFrame(gameLoop);
});
