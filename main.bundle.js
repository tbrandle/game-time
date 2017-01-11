/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

	const Block = __webpack_require__(1);
	const Paddle = __webpack_require__(2);
	const Ball = __webpack_require__(3);
	const Game = __webpack_require__(4);

	let game = new Game({ context: context });

	$('body').keydown(function (event) {
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
	  game.ball.ballBoundries(game.paddle);
	  game.paddle.canvasBoundries();
	  game.blocks.forEach(function (block) {
	    if (block.counter) {
	      block.draw();
	      game.ball.ballBoundries(block);
	    }
	  });
	  game.levelPass();
	  game.gameOver();
	  game.resetGame();
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	function Block(options) {
	  this.x = options.x || 0;
	  this.y = options.y || 10;
	  this.width = options.width || 50;
	  this.height = options.height || 15;
	  this.counter = options.counter || 1;
	  this.context = options.context;
	  this.color = '#eac761';
	  this.type = "block";
	}

	Block.prototype.draw = function () {
	  this.context.fillStyle = this.color;
	  if (this.counter === 3) {
	    this.color = "#f75e50";
	  }
	  if (this.counter === 2) {
	    this.color = "#eac761";
	  }
	  if (this.counter === 1) {
	    this.color = "#7d7769";
	  }
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Block.prototype.remove = function (ball) {
	  if (this.counter <= 0) {
	    this.context.clearRect(this.x, this.y, this.width, this.height);
	    this.height = 0;
	    this.width = 0;
	  } else {
	    this.counter--;
	  }
	};

	module.exports = Block;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Paddle(options) {
	  this.x = 150;
	  this.y = 275;
	  this.width = 100;
	  this.height = 10;
	  this.context = options.context;
	  this.color = '#91c09e';
	}

	Paddle.prototype.draw = function () {
	  this.context.fillStyle = this.color;
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Paddle.prototype.move = function (direction) {
	  if (direction === 37) {
	    this.x -= 25;
	  } else if (direction === 39) {
	    this.x += 25;
	  }
	  return this;
	};

	Paddle.prototype.canvasBoundries = function (options) {
	  if (this.x >= 300) {
	    this.x = 300;
	  } else if (this.x <= 0) {
	    this.x = 0;
	  }
	};

	module.exports = Paddle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// const canvas = document.getElementById('game');
	// const context = canvas.getContext('2d');

	function Ball(options) {
	  this.x = 200;
	  this.y = 260;
	  this.radius = 6;
	  this.startAngle = 0;
	  this.endAngle = 2 * Math.PI;
	  this.context = options.context;
	  this.speed = 3;
	  this.dx = this.speed;
	  this.dy = -this.speed;
	  this.lives = 3;
	  this.gameScore = 0;
	  this.color = '#000000';
	  this.moveBallTrigger = false;
	  this.startGameTrigger = false;
	}

	Ball.prototype.drawBall = function () {
	  this.context.fillStyle = this.color;
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	  this.context.fill();
	  this.context.closePath();
	  return this;
	};

	Ball.prototype.move = function () {
	  this.x += this.dx;
	  this.y += this.dy;
	  return this;
	};

	Ball.prototype.resetBall = function () {
	  this.x = 200;
	  this.y = 260;
	  this.moveBallTrigger = false;
	};

	Ball.prototype.startBall = function () {
	  var ball = this;
	  $('body').keydown(function (event) {
	    var direction = event.keyCode;
	    if (direction === 32) {
	      ball.moveBallTrigger = true;
	    }
	  });
	  if (this.moveBallTrigger === true && this.startGameTrigger === true) {
	    ball.move();
	  }
	};

	Ball.prototype.up = function () {
	  this.dy = -this.speed;
	};

	Ball.prototype.down = function () {
	  this.dy = this.speed;
	};

	Ball.prototype.right = function () {
	  this.dx = this.speed;
	};

	Ball.prototype.left = function () {
	  this.dx = -this.speed;
	};

	Ball.prototype.canvasBoundries = function () {
	  if (this.y - this.radius <= 0) {
	    this.y = this.radius;
	    this.down();
	  }
	  if (this.x + this.radius > canvas.width) {
	    this.x = canvas.width - this.radius;
	    this.left();
	  }
	  if (this.x - this.radius < 0) {
	    this.x = this.radius;
	    this.right();
	  }
	  if (this.y - this.radius > 300) {
	    this.resetBall();
	    this.lives--;
	  }
	};

	Ball.prototype.ballBoundries = function (object) {
	  if (this.y - this.radius < object.y + object.height && this.x < object.x + object.width && this.x > object.x && this.y - this.radius > object.y) {
	    this.y = this.y + this.radius;
	    this.down();
	    if (object.type === "block") {
	      object.remove(this);
	    }
	  }
	  if (this.y + this.radius > object.y && this.y + this.radius < object.y + object.height && this.x < object.x + object.width && this.x > object.x) {
	    this.y = this.y - this.radius;
	    this.up();
	    if (object.type === "block") {
	      object.remove(this);
	    }
	  }
	  if (this.x + this.radius > object.x && this.x + this.radius < object.x + object.width && this.y > object.y && this.y < object.y + object.height) {
	    this.x = this.x - this.radius;
	    this.left();
	    if (object.type === "block") {
	      object.remove(this);
	    }
	  }
	  if (this.x - this.radius > object.x && this.x - this.radius < object.x + object.width && this.y > object.y && this.y < object.y + object.height) {
	    this.x = this.x + this.radius;
	    this.right();
	    if (object.type === "block") {
	      object.remove(this);
	    }
	  }
	};

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// const canvas = document.getElementById('game');
	// const context = canvas.getContext('2d');

	const Block = __webpack_require__(1);
	const Ball = __webpack_require__(3);
	const Paddle = __webpack_require__(2);

	// var startGameTrigger = false;
	var gameScore = 0;

	function Game(options) {
	  this.blocks = [];
	  this.canvas = options.canvas;
	  this.context = options.context;
	  this.level = 0;
	  this.ball = new Ball(options);
	  this.paddle = new Paddle(options);
	}

	Game.prototype.createRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};
	Game.prototype.buildLevels = function () {
	  if (this.level === 1) {
	    this.createRow({ num: 6, xStart: -55, yStart: 10, spacing: 65, counter: 1 });
	    this.createRow({ num: 6, xStart: -55, yStart: 30, spacing: 65, counter: 1 });
	    this.createRow({ num: 6, xStart: -55, yStart: 50, spacing: 65, counter: 1 });
	    this.createRow({ num: 6, xStart: -55, yStart: 70, spacing: 65, counter: 1 });
	  } else if (this.level === 2) {
	    this.createRow({ num: 3, xStart: -100, yStart: 10, spacing: 130, counter: 3 });
	    this.createRow({ num: 3, xStart: 0, yStart: 30, spacing: 80, counter: 2 });
	    this.createRow({ num: 1, xStart: 60, yStart: 50, spacing: 100, counter: 1 });
	    this.createRow({ num: 3, xStart: 0, yStart: 70, spacing: 80, counter: 2 });
	    this.createRow({ num: 3, xStart: -100, yStart: 90, spacing: 130, counter: 3 });
	  } else if (this.level === 3) {
	    this.createRow({ num: 7, xStart: -60, yStart: 10, spacing: 60, counter: 1 });
	    this.createRow({ num: 2, xStart: -70, yStart: 30, spacing: 165, counter: 1 });
	    this.createRow({ num: 2, xStart: 88, yStart: 50, spacing: 60, counter: 3 });
	    this.createRow({ num: 2, xStart: 0, yStart: 70, spacing: 120, counter: 3 });
	    this.createRow({ num: 2, xStart: -70, yStart: 90, spacing: 165, counter: 3 });
	    this.createRow({ num: 7, xStart: -60, yStart: 110, spacing: 60, counter: 1 });
	  } else if (this.level === 4) {
	    this.createRow({ num: 4, xStart: -75, yStart: 10, spacing: 100, counter: 3 });
	    this.createRow({ num: 6, xStart: -55, yStart: 30, spacing: 65, counter: 2 });
	    this.createRow({ num: 4, xStart: -75, yStart: 50, spacing: 100, counter: 3 });
	    this.createRow({ num: 6, xStart: -55, yStart: 70, spacing: 65, counter: 2 });
	    this.createRow({ num: 7, xStart: -45, yStart: 90, spacing: 55, counter: 1 });
	  }
	};

	Game.prototype.removeMessageDisplay = function () {
	  var game = this;
	  $('.start-game').on('click', function () {
	    this.blocks = [];
	    $('.message').css('display', 'none');
	    game.ball.resetBall();
	    game.ball.startGameTrigger = true;
	    gameScore = 0;
	  });
	};

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
	};

	Game.prototype.resetGame = function () {
	  var game = this;
	  $('.start-new-game').on('click', function () {
	    game.blocks = [];
	    $('.message').css('display', 'none');
	    game.ball.resetBall();
	    game.ball.lives = 3;
	    gameScore = 0;
	    game.level = 0;
	  });
	};

	Game.prototype.gameOver = function () {
	  if (this.ball.lives === 0) {
	    var game = this;
	    $('.game-over').css('display', 'flex');
	    game.removeMessageDisplay();
	    game.resetGame();
	    game.ball.lives = 3;
	  }
	};

	module.exports = Game;

/***/ }
/******/ ]);