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
	  if (paddle.x >= canvas.width - paddle.width) {
	    paddle.x = 300;
	  } else if (paddle.x <= 0) {
	    paddle.x = 0;
	  }
	}

	function ballBoundries(object) {
	  if (ball.y - ball.radius < object.y + object.height && ball.x < object.x + object.width && ball.x > object.x && ball.y - ball.radius > object.y) {
	    ball.y = ball.y + ball.radius;
	    down(ball);
	  }
	  if (ball.y + ball.radius > object.y && ball.y + ball.radius < object.y + object.height && ball.x < object.x + object.width && ball.x > object.x) {
	    ball.y = ball.y - ball.radius;
	    up(ball);
	  }
	  if (ball.x + ball.radius > object.x && ball.x + ball.radius < object.x + object.width && ball.y > object.y && ball.y < object.y + object.height) {
	    ball.x = ball.x - ball.radius;
	    left(ball);
	  }
	  if (ball.x - ball.radius > object.x && ball.x - ball.radius < object.x + object.width && ball.y > object.y && ball.y < object.y + object.height) {
	    ball.x = ball.x + ball.radius;
	    right(ball);
	  }
	}

	function createFirstRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block({ context: context, x: x += 60 }));
	  }
	}
	function createSecondRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block({ context: context, x: x += 60, y: 30 }));
	  }
	}
	function createThirdRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block({ context: context, x: x += 100, y: 50 }));
	  }
	}
	function createFourthRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    blocks.push(new Block({ context: context, x: x += 60, y: 70 }));
	  }
	}

	createFirstRow(6);
	createSecondRow(6);
	createThirdRow(3);
	createFourthRow(6);

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
	    block.remove(ball, blocks);
	    ballBoundries(block);
	  });
	  ballBoundries(paddle);
	  canvasBoundries(ball, paddle);
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
	  this.context = options.context;
	  this.counter = 1;
	}

	Block.prototype.draw = function () {
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Block.prototype.remove = function (ball, blocks) {
	  if (ball.y - ball.radius < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x && ball.y - ball.radius > this.y) {
	    this.counter--;
	  }
	  if (ball.y + ball.radius > this.y && ball.y + ball.radius < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x) {
	    this.counter--;
	  }
	  if (ball.x + ball.radius > this.x && ball.x + ball.radius < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
	    this.counter--;
	  }
	  if (ball.x - ball.radius > this.x && ball.x - ball.radius < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
	    this.counter--;
	  }
	  if (this.counter === 0) {
	    var index = blocks.indexOf(this);
	    this.context.clearRect(this.x, this.y, this.width, this.height);
	    blocks.splice(index, 1);
	  }
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
	  this.x += this.dx;
	  this.y += this.dy;
	  return this;
	};

	module.exports = Ball;

/***/ }
/******/ ]);