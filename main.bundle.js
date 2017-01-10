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

	
	/************************************
	      global variables
	 ************************************/

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

	const Block = __webpack_require__(1);
	const Paddle = __webpack_require__(2);
	const Ball = __webpack_require__(3);

	let block = new Block({ context: context });
	let ball = new Ball({ context: context, canvas: canvas });
	let paddle = new Paddle({ context: context, canvas: canvas });

	var blocks = [];
	var level = 0;
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
	  if (ball.y - ball.radius > 300) {
	    resetBall();
	    ball.lives--;
	    $('.lives').text("Lives: " + ball.lives);
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

	/************************************
	      constructing levels
	 ************************************/

	function createFirstRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    var block = new Block({ context: context, x: x += 60 });
	    blocks.push(block);
	  }
	}
	function createSecondRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    var block = new Block({ context: context, x: x += 60, y: 30 });
	    blocks.push(block);
	  }
	}
	function createThirdRow(num) {
	  this.x = -50;
	  for (var i = 0; i < num; i++) {
	    var block = new Block({ context: context, x: x += 100, y: 50, counter: 3 });
	    blocks.push(block);
	  }
	}
	function createFourthRow(options) {
	  this.x = -50;
	  for (var i = 0; i < options.num; i++) {
	    var block = new Block(options);
	    blocks.push(block);
	  }
	  console.log(options);
	}

	function levels() {
	  resetBall();
	  paddle.x = (canvas.width - 100) / 2;
	  if (level === 1) {
	    // createFirstRow(6);
	    // createSecondRow(6);
	    // createThirdRow(3);
	    createFourthRow({ num: 6, context: context, x: x += 60, y: 70 });
	  } else if (level === 2) {
	    // createFirstRow(1);
	    // createSecondRow(1);
	    // createThirdRow(1);
	    createFourthRow(1);
	    // }else if (level === 3) {
	    //   createFirstRow(2);
	    //   createSecondRow(2);
	    //   createThirdRow(2);
	    //   createFourthRow(6);
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

	function resetGame() {
	  $('.start-new-game').on('click', function () {
	    blocks = [];
	    $('.message').css('display', 'none');
	    moveBallTrigger = false;
	    ball.lives = 3;
	    level = 0;
	  });
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
	  if (blockHeight === true && level < 2 && level >= 0) {
	    level++;
	    startGameTrigger = false;
	    $('.level-pass').css('display', 'flex');
	    $('.level').text('Level ' + level);
	    levels();
	    removeMessageDisplay();
	  } else if (blockHeight === true && level === 2) {
	    $('.winner').css('display', 'flex');
	    $('.level-pass').css('display', 'none');
	    resetGame();
	  }
	}

	function gameOver() {
	  if (ball.lives === 0) {
	    $('.game-over').css('display', 'flex');
	    removeMessageDisplay();
	    ball.lives = 3;
	  }
	}

	function removeMessageDisplay() {
	  $('.start-game').on('click', function () {
	    // blocks = [];
	    $('.message').css('display', 'none');
	    moveBallTrigger = false;
	    startGameTrigger = true;
	  });
	}

	/************************************
	      Event Listeners
	 ************************************/

	$('body').keydown(function (event) {
	  var direction = event.keyCode;
	  paddle.move(direction);
	  if (direction === 32) {
	    moveBallTrigger = true;
	  }
	});

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  paddle.draw();
	  startBall();
	  ball.drawBall();
	  blocks.forEach(function (block) {
	    block.draw();
	    block.remove(ball, blocks);
	    ballBoundries(block);
	  });
	  ballBoundries(paddle);
	  canvasBoundries(ball, paddle);
	  gameOver();
	  levelPass();
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
	}

	// Block.prototype.blockColor =  function () {
	//   if (this.counter === 3 ) {
	//     this.context.fillStyle = "#ff0000"
	//   }
	// }

	Block.prototype.draw = function () {
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Block.prototype.remove = function (ball, blocks) {
	  if (this.counter <= 0) {
	    this.context.clearRect(this.x, this.y, this.width, this.height);
	    this.height = 0;
	  }
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
	  this.speed = 3;
	  this.dx = this.speed;
	  this.dy = -this.speed;
	  this.lives = 3;
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