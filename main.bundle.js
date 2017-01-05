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

	let block = new Block({ context: context });
	let ball = new Ball({ context: context, canvas: canvas });
	let paddle = new Paddle({ context: context, canvas: canvas });

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
	  if (ball.y - ball.radius <= 0) {
	    ball.y = ball.radius;
	    down(ball);
	  }
	  if (ball.x + ball.radius > canvas.width) {
	    ball.x = canvas.width - ball.radius;
	    left(ball);
	  }
	  if (ball.x - ball.radius < 0) {
	    ball.x = ball.radius;
	    right(ball);
	  }
	  if (ball.y + ball.radius > paddle.y && paddle.x + paddle.width > ball.x + ball.radius && ball.x - ball.radius > paddle.x && ball.y + ball.radius < paddle.y + paddle.height) {
	    up(ball);
	  }
	}

	function blockBoundries(block) {
	  if (ball.y - ball.radius <= block.y + block.height && ball.x + ball.radius < block.x + block.width && ball.x > block.x && ball.y - ball.radius > block.y) {
	    ball.y = ball.y + ball.radius;
	    down(ball);
	  }
	  if (ball.x + ball.radius > block.x && ball.x + ball.radius < block.x + block.width && ball.y > block.y && ball.y < block.y + block.height) {
	    ball.x = ball.x + ball.radius;
	    left(ball);
	  }
	  // if ((ball.x + ball.radius) <= block.y + block.height && (ball.x + ball.radius) > block.x + block.width && (ball.x + ball.radius) > block.x && (ball.y + ball.radius) > block.y) {
	  //    ball.x = ball.x - ball.radius;
	  //    left(ball);
	  //  }
	  if (ball.x - ball.radius < block.x + block.height && ball.y - ball.radius > block.y && ball.y + ball.radius < block.y + block.height) {
	    ball.x = ball.x - ball.radius;
	    right(ball);
	  }
	  // if ((ball.x - ball.radius) < 0){
	  //    ball.x = ball.radius;
	  //    right(ball);
	  //  }
	  if (ball.y + ball.radius > block.y && block.x + block.width > ball.x + ball.radius && ball.x - ball.radius > block.x && ball.y + ball.radius < block.y + block.height) {
	    up(ball);
	  }
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
	  this.x = 50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block(context, x += 60, 50));
	  }
	}
	function createFourthRow(num) {
	  this.x = 40;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block(context, x += 60, 70));
	  }
	}

	// createFirstRow(6);
	// createSecondRow(6);
	createThirdRow(4);
	createFourthRow(4);

	//Event Listeners

	$('body').keydown(function (event) {
	  var direction = event.keyCode;
	  paddle.move(direction);
	});

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  paddle.draw();
	  ball.drawBall().move();
	  blocks.forEach(function (block) {
	    block.draw();
	    blockBoundries(block);
	  });
	  paddleBoundaries();
	  ballBoundries();
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	function Block(options) {
	  this.x = 0;
	  this.y = 10;
	  this.width = 50;
	  this.height = 15;
	  this.context = options.context;
	}

	Block.prototype.draw = function () {
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	module.exports = Block;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Paddle(options) {
	  this.x = (options.canvas.width - 100) / 2;
	  this.y = 275;
	  this.width = 100;
	  this.height = 15;
	  this.context = options.context;
	}

	Paddle.prototype.draw = function () {
	  this.context.fillRect(this.x, this.y, this.width, this.height);
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

	function Ball(options) {
	  this.x = options.canvas.width / 2;
	  this.y = options.canvas.height / 2;
	  this.radius = 6;
	  this.startAngle = 0;
	  this.endAngle = 2 * Math.PI;
	  this.context = options.context;
	  this.speed = 2;
	  this.dx = this.speed;
	  this.dy = -this.speed;
	}

	Ball.prototype.drawBall = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	  this.context.fill();
	  this.context.closePath();
	  return this;
	};

	Ball.prototype.move = function () {
	  // this.drawBall();
	  this.x += this.dx;
	  this.y += this.dy;
	  return this;
	};

	module.exports = Ball;

/***/ }
/******/ ]);