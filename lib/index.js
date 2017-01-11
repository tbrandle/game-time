const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const Block = require('./block');
const Paddle = require('./paddle');
const Ball = require('./ball');
const Game = require('./game');

let game = new Game({context: context});

$('body').keydown(function(event) {
  var direction = event.keyCode;
  game.paddle.move(direction);
});

game.buildLevels();

requestAnimationFrame(function gameLoop() {
  $('.score').text("Score: " + game.ball.gameScore);
  $('.lives').text("Lives: " + game.ball.lives);
  context.clearRect(0, 0, canvas.width, canvas.height);

  game.paddle.draw();
  game.paddle.move();
  game.ball.startBall();
  game.ball.drawBall();
  game.ball.canvasBoundries();
  game.ball.ballBoundries(game.paddle)
  game.paddle.canvasBoundries();
  game.blocks.forEach(function (block) {
    if(block.counter){
      block.draw();
      game.ball.ballBoundries(block);
    }
  });
  game.levelPass();
  game.gameOver();
  game.resetGame();
  requestAnimationFrame(gameLoop);
});
