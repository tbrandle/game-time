const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const Block = require('./block');
const Ball = require('./ball');
const Paddle = require('./paddle');

blocks = [];

var moveBallTrigger = false;
var startGameTrigger = false;
var gameScore = 0;

function Game(options) {
  this.canvas = options.canvas;
  this.context = options.context;
  this.level = 0
  this.ball = new Ball(options);
  this.paddle = new Paddle(options);
}

Game.prototype.methodName = function () {

};

Game.prototype.createFirstRow = function (obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart || 10;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    blocks.push(block);
  }
};

Game.prototype.createSecondRow = function (obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart || 30;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    blocks.push(block);
  }
}

Game.prototype.createThirdRow = function (obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart || 50;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    blocks.push(block);
  }
}

Game.prototype.createFourthRow = function (obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart || 70;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    blocks.push(block);
  }
}

Game.prototype.createFifthRow = function (obj) {
  var xStart = obj.xStart;
  var yStart = obj.yStart || 90;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    blocks.push(block);
  }
}

Game.prototype.createSixthRow = function (obj) {
  var xStart = obj.xStart;
  var yStart =  obj.yStart || 110;
  var spacing = obj.spacing;
  var counter = obj.counter;
  for (var i = 0; i < obj.num; i++) {
    var block = new Block ({context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter});
    blocks.push(block);
  }
}

Game.prototype.buildLevels = function () {
  if ( this.level === 1) {
    this.createFirstRow({num: 7, xStart: -60, spacing: 60, counter: 1});
    this.createSecondRow({num: 7, xStart: -60, spacing: 60, counter: 1});
    this.createThirdRow({num: 7, xStart: -60, spacing: 60, counter: 1});
    this.createFourthRow({num: 7, xStart: -60, spacing: 60, counter: 1});
  } else if (this.level === 2) {
    this.createFirstRow({num: 3, xStart: -100, spacing: 130, counter: 3});
    this.createSecondRow({num: 3, xStart: 0, spacing: 80, counter: 2});
    this.createThirdRow({num: 1, xStart: 60, spacing: 100, counter: 1});
    this.createFourthRow({num: 3, xStart: 0, spacing: 80, counter: 2});
    this.createFifthRow({num: 3, xStart: -100, spacing: 130, counter: 3});
  } else if (this.level === 3) {
    this.createFirstRow({num: 7, xStart: -60, spacing: 60, counter: 1});
    this.createSecondRow({num: 2, xStart: -70, spacing: 165, counter: 1});
    this.createThirdRow({num: 2, xStart: 88, spacing: 60, counter: 3});
    this.createFourthRow({num: 2, xStart: 0, spacing: 120, counter: 3});
    this.createFifthRow({num: 2, xStart: -70, spacing: 165, counter: 3});
    this.createSixthRow({num: 7, xStart: -60, spacing: 60, counter: 1});
  } else if (this.level === 4) {
    this.createFirstRow({num: 6, xStart: 15, spacing: 55, counter: 1});
    this.createSecondRow({num: 5, xStart: -60, spacing: 55, yStart: 50, counter: 1});
    this.createThirdRow({num: 6, xStart: -60, spacing: 55, yStart: 90, counter: 3});
    this.createFourthRow({num: 5, xStart: -60, spacing: 55, yStart: 130, counter: 3});
  }
}

Game.prototype.removeMessageDisplay = function() {
  $('.start-game').on('click', function() {
    blocks = [];
    $('.message').css('display', 'none');
    moveBallTrigger = false;
    startGameTrigger = true;
    gameScore = 0;
  });
}

Game.prototype.levelPass = function () {
  var blockHeight = blocks.every(checkHeight);
  function checkHeight(blocks) {
    if (blocks.height !== 0) {
      return false;
    } else {
      return true;
    }
  }
  if (blockHeight === true && this.level < 4 && this.level >= 0) {
    this.level++;
    startGameTrigger = false;
    $('.level-pass').css('display', 'flex');
    $('.level').text('Level ' + this.level);
    this.buildLevels();
    this.removeMessageDisplay();
  } else if (blockHeight === true && this.level === 4) {
      $('.winner').css('display', 'flex');
      $('.level-pass').css('display', 'none');
      this.resetGame();
    }
  }

Game.prototype.resetGame = function () {
  $('.start-new-game').on('click', function() {
    blocks = [];
    $('.message').css('display', 'none');
    moveBallTrigger = false;
    this.ball.lives = 3;
    gameScore = 0;
    this.level = 0;
  });
}

Game.prototype.gameOver = function() {
  if (this.ball.lives === 0) {
    $('.game-over').css('display', 'flex');
    this.removeMessageDisplay();
    this.resetGame();
    this.ball.lives = 3;
  }
}


module.exports = Game;
