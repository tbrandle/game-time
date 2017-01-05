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

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var Block = __webpack_require__(1);
	var Paddle = __webpack_require__(2);
	var Ball = __webpack_require__(3);

	var blocks = [];

	var paddle = new Paddle();
	var ball = new Ball();

	function paddleBoundaries() {
	  if (paddle.x >= canvas.width - paddle.width) {
	    paddle.x = 300;
	  } else if (paddle.x <= 0) {
	    paddle.x = 0;
	  }
	}

	function ballBoundries() {
	  if (ball.y <= 0) {
	    ball.dy = -ball.dy;
	  } else if (ball.x > canvas.width || ball.x < 0) {
	    ball.dx = -ball.dx;
	  } else if (ball.y === paddle.y && paddle.x + paddle.width > ball.x && ball.x > paddle.x) {
	    ball.dy = -ball.dy;
	  }
	}

	function blockBoundries() {
	  blocks.forEach(function (block) {

	    var bottomLeft = block.y + block.height;
	    var topRight = block.x + block.width;
	    var bottomRight = topRight + bottomLeft;

	    if (ball.y === bottomLeft && bottomRight > ball.x && ball.x > bottomLeft) {
	      ball.dy = -ball.dy;
	    }
	    if (ball.y === block.x && topRight > ball.x && ball.x > block.x) {
	      ball.dy = -ball.dy;
	    }
	    if (ball.x === bottomLeft && ball.y < bottomLeft && ball.y > topLeft) {
	      ball.dx = -ball.dx;
	    }
	    if (ball.x === bottomRight && ball.y < bottomRight && ball.y > topRight) {
	      ball.dx = -ball.dx;
	    }
	  });
	}

	function createFirstRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block(context, x += 60));
	  }
	}
	function createSecondRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block(context, x += 60, 30));
	  }
	}
	function createThirdRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block(context, x += 60, 50));
	  }
	}
	function createFourthRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block(context, x += 60, 70));
	  }
	}

	createFirstRow(6);
	createSecondRow(6);
	// createThirdRow(6)
	// createFourthRow(6)


	//Event Listeners

	$('body').keydown(function (event) {
	  var direction = event.keyCode;
	  paddle.move(direction);
	});

	requestAnimationFrame(function gameLoop() {
	  paddleBoundaries();
	  ballBoundries();
	  blockBoundries();
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  paddle.draw();
	  ball.drawBall().move();
	  blocks.forEach(function (block) {
	    block.draw();
	  });
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	function Block(context, x, y, width, height) {
	  this.x = x || 0;
	  this.y = y || 10;
	  this.width = width || 50;
	  this.height = height || 15;
	  this.context = context;
	}

	Block.prototype.draw = function () {
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	module.exports = Block;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	function Paddle() {
	  this.x = (canvas.width - this.width) / 2;
	  this.y = 275;
	  this.width = 100;
	  this.height = 15;
	}

	Paddle.prototype.draw = function () {
	  context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Paddle.prototype.move = function (direction) {
	  if (direction === 37) {
	    this.x -= 25;
	  } else if (direction === 39) {
	    this.x += 25;
	  }
	};

	module.exports = Paddle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	function Ball() {
	  this.x = canvas.width / 2;
	  this.y = canvas.height / 2;
	  this.radius = 6;
	  this.startAngle = 0;
	  this.endAngle = 2 * Math.PI;
	  this.dx = 5;
	  this.dy = -5;
	}

	Ball.prototype.drawBall = function () {
	  context.beginPath();
	  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	  context.fill();
	  context.closePath();
	  return this;
	};

	Ball.prototype.move = function () {
	  this.drawBall();
	  this.x += this.dx;
	  this.y += this.dy;
	  return this;
	};

	module.exports = Ball;

/***/ }
/******/ ]);