// const canvas = document.getElementById('game');
// const context = canvas.getContext('2d');

const Block = require('./block');
const Ball = require('./ball');
const Paddle = require('./paddle');



// var startGameTrigger = false;
var gameScore = 0;

function Game(options) {
  this.blocks = [];
  this.canvas = options.canvas;
  this.context = options.context;
  this.level = 0
  this.ball = new Ball(options);
  this.paddle = new Paddle(options);
}

Game.prototype.createRow = function(obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    this.blocks.push(block);
  }
}
Game.prototype.buildLevels = function () {
  if (this.level === 1) {
    this.createRow({num: 6, xStart: -55, yStart: 10, spacing: 65, counter: 1});
    this.createRow({num: 6, xStart: -55, yStart: 30, spacing: 65, counter: 1});
    this.createRow({num: 6, xStart: -55, yStart: 50, spacing: 65, counter: 1});
    this.createRow({num: 6, xStart: -55, yStart: 70, spacing: 65, counter: 1});
  } else if (this.level === 2) {
    this.createRow({num: 3, xStart: -100, yStart: 10, spacing: 130, counter: 3});
    this.createRow({num: 3, xStart: 0, yStart: 30, spacing: 80, counter: 2});
    this.createRow({num: 1, xStart: 60, yStart: 50, spacing: 100, counter: 1});
    this.createRow({num: 3, xStart: 0, yStart: 70, spacing: 80, counter: 2});
    this.createRow({num: 3, xStart: -100, yStart: 90, spacing: 130, counter: 3});
  } else if (this.level === 3) {
    this.createRow({num: 7, xStart: -60, yStart: 10, spacing: 60, counter: 1});
    this.createRow({num: 2, xStart: -70, yStart: 30, spacing: 165, counter: 1});
    this.createRow({num: 2, xStart: 88, yStart: 50, spacing: 60, counter: 3});
    this.createRow({num: 2, xStart: 0, yStart: 70, spacing: 120, counter: 3});
    this.createRow({num: 2, xStart: -70, yStart: 90, spacing: 165, counter: 3});
    this.createRow({num: 7, xStart: -60, yStart: 110, spacing: 60, counter: 1});
  } else if (this.level === 4) {
    this.createRow({num: 4, xStart: -75, yStart: 10, spacing: 100, counter: 3});
    this.createRow({num: 6, xStart: -55, yStart: 30, spacing: 65, counter: 2});
    this.createRow({num: 4, xStart: -75, yStart: 50, spacing: 100, counter: 3});
    this.createRow({num: 6, xStart: -55, yStart: 70, spacing: 65, counter: 2});
    this.createRow({num: 7, xStart: -45, yStart: 90, spacing: 55, counter: 1});
  }
}

Game.prototype.removeMessageDisplay = function() {
  var game = this;
  $('.start-game').on('click', function() {
    this.blocks = [];
    $('.message').css('display', 'none');
    game.ball.resetBall();
    game.ball.startGameTrigger = true;
    gameScore = 0;
  });
}

Game.prototype.levelPass = function () {
  var blockHeight = this.blocks.every(checkHeight);
  function checkHeight(blocks) {
    if (blocks.height !== 0) {
      return false;
    } else {
      return true;
    }
  }
  if (blockHeight === true && this.level < 1 && this.level >= 0) {
    this.level++;
    this.ball.startGameTrigger = false;
    $('.level-pass').css('display', 'flex');
    $('.level').text('Level ' + this.level);
    this.buildLevels();
    this.removeMessageDisplay();
    this.ball.resetBall();
  } else if (blockHeight === true && this.level === 1) {
      $('.winner').css('display', 'flex');
      $('.level-pass').css('display', 'none');
      this.resetGame();
    }
  }

Game.prototype.resetGame = function () {
  var game = this;
  $('.start-new-game').on('click', function() {
    game.blocks = [];
    $('.message').css('display', 'none');
    game.ball.resetBall();
    game.ball.lives = 3;
    gameScore = 0;
    game.level = 0;
  });
}

Game.prototype.gameOver = function() {
  if (this.ball.lives === 0) {
    var game = this;
    $('.game-over').css('display', 'flex');
    game.removeMessageDisplay();
    game.resetGame();
    game.ball.lives = 3;
  }
}


module.exports = Game;
