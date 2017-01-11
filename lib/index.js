
/************************************
      global variables
 ************************************/

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const Block = require('./block');
const Paddle = require('./paddle');
const Ball = require('./ball');
const Game = require('./levels');

let game = new Game({context: context});
// let ball = new Ball({context: context, canvas: canvas});
// let paddle = new Paddle({context: context, canvas: canvas});

// var blocks = [];
// var level = 2;
// var gameScore = 0;
// // var ball.moveBallTrigger = false;
// // var ball.startGameTrigger = false;
//
// /************************************
//     collision detection & boundries
//  ************************************/
//
// function canvasBoundries(ball, paddle) {
//   if ((ball.y - ball.radius) <= 0 ) {
//     ball.y = ball.radius;
//     ball.down();
//   }
//   if ((ball.x + ball.radius) > canvas.width){
//     ball.x = canvas.width - ball.radius;
//     ball.left();
//   }
//   if ((ball.x - ball.radius) < 0){
//     ball.x = ball.radius;
//     ball.right();
//   }
//   if ((ball.y - ball.radius) > 300) {
//     ball.resetBall();
//     ball.lives --;
//   }
//   if (paddle.x >= canvas.width - paddle.width) {
//     paddle.x = 300;
//   } else if (paddle.x <= 0) {
//     paddle.x = 0;
//   }
// }
//
// function ballBoundries(object) {
//   if ((ball.y - ball.radius) < object.y + object.height && ball.x < object.x + object.width && ball.x > object.x && (ball.y - ball.radius) > object.y) {
//     ball.y = ball.y + ball.radius;
//     ball.down();
//     console.log(blocks);
//
//   }
//   if ((ball.y + ball.radius) > object.y && (ball.y + ball.radius) < object.y + object.height && ball.x < object.x + object.width && ball.x > object.x) {
//     ball.y = ball.y - ball.radius;
//     ball.up();
//   }
//   if ((ball.x + ball.radius) > object.x && (ball.x + ball.radius) < object.x + object.width && ball.y > object.y && ball.y < object.y + object.height) {
//     ball.x = ball.x - ball.radius;
//     ball.left();
//   }
//   if ((ball.x - ball.radius) > object.x && (ball.x - ball.radius) < object.x + object.width && ball.y > object.y && ball.y < object.y + object.height) {
//     ball.x = ball.x + ball.radius;
//     ball.right();
//   }
// }

/************************************
      constructing levels
 ************************************/
 //
 // function createFirstRow(obj) {
 //   var xStart = obj.xStart;
 //   var yStart =  obj.yStart || 10;
 //   var spacing = obj.spacing;
 //   var counter = obj.counter;
 //   for (var i = 0; i < obj.num; i++) {
 //     var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
 //     blocks.push(block);
 //   }
 // }
 // function createSecondRow(obj) {
 //   var xStart = obj.xStart;
 //   var yStart =  obj.yStart || 30;
 //   var spacing = obj.spacing;
 //   var counter = obj.counter;
 //   for (var i = 0; i < obj.num; i++) {
 //     var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
 //     blocks.push(block);
 //   }
 // }
 // function createThirdRow(obj) {
 //   var xStart = obj.xStart;
 //   var yStart =  obj.yStart || 50;
 //   var spacing = obj.spacing;
 //   var counter = obj.counter;
 //   for (var i = 0; i < obj.num; i++) {
 //     var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
 //     blocks.push(block);
 //   }
 // }
 //
 // function createFourthRow(obj) {
 //   var xStart = obj.xStart;
 //   var yStart =  obj.yStart || 70;
 //   var spacing = obj.spacing;
 //   var counter = obj.counter;
 //   for (var i = 0; i < obj.num; i++) {
 //     var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
 //     blocks.push(block);
 //   }
 // }
 //
 // function createFifthRow(obj) {
 //   var xStart = obj.xStart;
 //   var yStart = obj.yStart || 90;
 //   var spacing = obj.spacing;
 //   var counter = obj.counter;
 //   for (var i = 0; i < obj.num; i++) {
 //     var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
 //     blocks.push(block);
 //   }
 // }
 //
 // function createSixthRow(obj) {
 //   var xStart = obj.xStart;
 //   var yStart =  obj.yStart || 110;
 //   var spacing = obj.spacing;
 //   var counter = obj.counter;
 //   for (var i = 0; i < obj.num; i++) {
 //     var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
 //     blocks.push(block);
 //   }
 // }
 //
 // function levels() {
 //
 //   if (level === 1) {
 //     createFirstRow({num: 7, xStart: -60, spacing: 60, counter: 1});
 //  //    createSecondRow({num: 7, xStart: -60, spacing: 60, counter: 1});
 //  //    createThirdRow({num: 7, xStart: -60, spacing: 60, counter: 1});
 //  //    createFourthRow({num: 7, xStart: -60, spacing: 60, counter: 1});
 //   } else if (level === 2) {
 //     createFirstRow({num: 3, xStart: -100, spacing: 130, counter: 3});
 //  //    createSecondRow({num: 3, xStart: 0, spacing: 80, counter: 2});
 //  //    createThirdRow({num: 1, xStart: 60, spacing: 100, counter: 1});
 //  //    createFourthRow({num: 3, xStart: 0, spacing: 80, counter: 2});
 //  //    createFifthRow({num: 3, xStart: -100, spacing: 130, counter: 3});
 //  //  } else if (level === 3) {
 //  //    createFirstRow({num: 7, xStart: -60, spacing: 60, counter: 1});
 //  //    createSecondRow({num: 2, xStart: -70, spacing: 165, counter: 1});
 //  //    createThirdRow({num: 2, xStart: 88, spacing: 60, counter: 3});
 //  //    createFourthRow({num: 2, xStart: 0, spacing: 120, counter: 3});
 //  //    createFifthRow({num: 2, xStart: -70, spacing: 165, counter: 3});
 //  //    createSixthRow({num: 7, xStart: -60, spacing: 60, counter: 1});
 //  //  } else if (level === 4) {
 //  //    createFirstRow({num: 6, xStart: 15, spacing: 55, counter: 1});
 //  //    createSecondRow({num: 5, xStart: -60, spacing: 55, yStart: 50, counter: 1});
 //  //    createThirdRow({num: 6, xStart: -60, spacing: 55, yStart: 90, counter: 3});
 //  //    createFourthRow({num: 5, xStart: -60, spacing: 55, yStart: 130, counter: 3});
 //   }
 // }



/************************************
        game play
 ************************************/



// function levelPass() {
//   var blockHeight = blocks.every(checkHeight);
//   function checkHeight(blocks) {
//     if (blocks.height !== 0) {
//       return false;
//     } else {
//       return true;
//     }
//   }
//   if (blockHeight === true && level < 4 && level >= 0) {
//     level++;
//     ball.startGameTrigger = false;
//     $('.level-pass').css('display', 'flex');
//     $('.level').text('Level ' + level);
//     ball.resetBall();
//     paddle.x = (canvas.width - 100) / 2;
//     levels();
//     removeMessageDisplay();
//   } else if (blockHeight === true && level === 4) {
//       $('.winner').css('display', 'flex');
//       $('.level-pass').css('display', 'none');
//       resetGame();
//     }
//   }
//
// function resetGame() {
//   $('.start-new-game').on('click', function() {
//     blocks = [];
//     $('.message').css('display', 'none');
//     ball.moveBallTrigger = false;
//     ball.lives = 3;
//     ball.gameScore = 0;
//     level = 0;
//   });
// }
//
// function gameOver() {
//   if (ball.lives === 0) {
//     $('.game-over').css('display', 'flex');
//     removeMessageDisplay();
//     resetGame();
//     ball.lives = 3;
//   }
// }
//
// function removeMessageDisplay() {
//   $('.start-game').on('click', function() {
//     // blocks = [];
//     $('.message').css('display', 'none');
//     ball.moveBallTrigger = false;
//     ball.startGameTrigger = true;
//     ball.gameScore = 0;
//   });
// }
//
/************************************
      Event Listeners
 ************************************/



$('body').keydown(function(event) {
  var direction = event.keyCode;
  game.paddle.move(direction);
  if (direction === 32) {
    game.ball.moveBallTrigger = true;
  }
});

requestAnimationFrame(function gameLoop() {
  $('.score').text("Score: " + game.ball.gameScore);
  $('.lives').text("Lives: " + game.ball.lives);
  context.clearRect(0, 0, canvas.width, canvas.height);

  game.paddle.draw();
  game.ball.startBall();
  game.ball.drawBall();
  blocks.forEach(function (block) {
    block.draw();
    block.remove(game.ball, game.blocks);
    // ballBoundries(block);
  });
  game.buildLevels();
  // ballBoundries(paddle);
  // canvasBoundries(ball, paddle);
  game.levelPass();
  game.gameOver();
  // game.resetGame();
  requestAnimationFrame(gameLoop);
});
