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
	const Game = __webpack_require__(4);

	let game = new Game({ context: context });
	// let ball = new Ball({context: context, canvas: canvas});
	// let paddle = new Paddle({context: context, canvas: canvas});

	// var blocks = [];
	// var level = 2;
	// var gameScore = 0;
	// // var ball.moveBallTrigger = false;
	// // var ball.startGameTrigger = false;
	//
	/************************************
	    collision detection & boundries
	 ************************************/

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

	  // game.blocks = game.blocks.filter(function(block) {
	  //   return block.counter !== 0;
	  // });
	  game.blocks.forEach(function (block) {
	    block.draw();
	    game.ball.ballBoundries(block);
	    // block.remove(game.ball);
	  });

	  // ballBoundries(paddle);
	  // canvasBoundries(ball, paddle);
	  game.levelPass();
	  game.gameOver();
	  // game.resetGame();
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
	  if (ball) {
	    if (this.counter <= 0) {
	      this.context.clearRect(this.x, this.y, this.width, this.height);
	      this.height = 0;
	      // console.log(this.counter);
	    }

	    if (ball.y - ball.radius >= this.y + this.height && ball.y + ball.radius <= this.y && ball.x + ball.radius <= this.x && ball.x - ball.radius >= this.x + this.width) {
	      console.log("test");
	      this.counter--;
	    }
	  }
	  //
	  // if ((ball.y - ball.radius) < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x && (ball.y - ball.radius) > this.y) {
	  //   // ball.gameScore += 10;
	  //   this.counter--;
	  //   // console.log(this.counter);
	  //
	  // }
	  //
	  // if ((ball.y + ball.radius) > this.y && (ball.y + ball.radius) < this.y + this.height && ball.x < this.x + this.width && ball.x > this.x) {
	  //   // ball.gameScore += 10;
	  //   this.counter--;
	  //   // console.log(this.counter);
	  //
	  // }
	  //
	  // if ((ball.x + ball.radius) > this.x && (ball.x + ball.radius) < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
	  //   // ball.gameScore += 10;
	  //   this.counter--;
	  //   // console.log(this.counter);
	  //
	  // }
	  //
	  // if ((ball.x - ball.radius) > this.x && (ball.x - ball.radius) < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
	  //   ball.gameScore += 10;
	  //   this.counter--;
	  //   ball.gameScore += 10;
	  // }
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

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

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
	  if (this.moveBallTrigger === true) {
	    //Need to add the (&& this.startGameTrigger === true)
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
	      object.remove(game.ball);
	    }
	  }
	  if (this.y + this.radius > object.y && this.y + this.radius < object.y + object.height && this.x < object.x + object.width && this.x > object.x) {
	    this.y = this.y - this.radius;
	    this.up();
	    if (object.type === "block") {
	      object.remove(game.ball);
	    }
	  }
	  if (this.x + this.radius > object.x && this.x + this.radius < object.x + object.width && this.y > object.y && this.y < object.y + object.height) {
	    this.x = this.x - this.radius;
	    this.left();
	    if (object.type === "block") {
	      object.remove(game.ball);
	    }
	  }
	  if (this.x - this.radius > object.x && this.x - this.radius < object.x + object.width && this.y > object.y && this.y < object.y + object.height) {
	    this.x = this.x + this.radius;
	    this.right();
	    if (object.type === "block") {
	      object.remove(game.ball);
	    }
	  }
	};

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

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

	Game.prototype.createFirstRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart || 10;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};

	Game.prototype.createSecondRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart || 30;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};

	Game.prototype.createThirdRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart || 50;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};

	Game.prototype.createFourthRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart || 70;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};

	Game.prototype.createFifthRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart || 90;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};

	Game.prototype.createSixthRow = function (obj) {
	  var xStart = obj.xStart;
	  var yStart = obj.yStart || 110;
	  var spacing = obj.spacing;
	  var counter = obj.counter;
	  for (var i = 0; i < obj.num; i++) {
	    var block = new Block({ context: context, x: xStart += spacing, y: yStart, height: obj.height, counter: counter });
	    this.blocks.push(block);
	  }
	};

	Game.prototype.buildLevels = function () {
	  if (this.level === 1) {
	    this.createFirstRow({ num: 7, xStart: -60, spacing: 60, counter: 1 });
	    this.createSecondRow({ num: 7, xStart: -60, spacing: 60, counter: 1 });
	    this.createThirdRow({ num: 7, xStart: -60, spacing: 60, counter: 1 });
	    this.createFourthRow({ num: 7, xStart: -60, spacing: 60, counter: 1 });
	  } else if (this.level === 2) {
	    this.createFirstRow({ num: 3, xStart: -100, spacing: 130, counter: 3 });
	    this.createSecondRow({ num: 3, xStart: 0, spacing: 80, counter: 2 });
	    this.createThirdRow({ num: 1, xStart: 60, spacing: 100, counter: 1 });
	    this.createFourthRow({ num: 3, xStart: 0, spacing: 80, counter: 2 });
	    this.createFifthRow({ num: 3, xStart: -100, spacing: 130, counter: 3 });
	  } else if (this.level === 3) {
	    this.createFirstRow({ num: 7, xStart: -60, spacing: 60, counter: 1 });
	    this.createSecondRow({ num: 2, xStart: -70, spacing: 165, counter: 1 });
	    this.createThirdRow({ num: 2, xStart: 88, spacing: 60, counter: 3 });
	    this.createFourthRow({ num: 2, xStart: 0, spacing: 120, counter: 3 });
	    this.createFifthRow({ num: 2, xStart: -70, spacing: 165, counter: 3 });
	    this.createSixthRow({ num: 7, xStart: -60, spacing: 60, counter: 1 });
	  } else if (this.level === 4) {
	    this.createFirstRow({ num: 6, xStart: 15, spacing: 55, counter: 1 });
	    this.createSecondRow({ num: 5, xStart: -60, spacing: 55, yStart: 50, counter: 1 });
	    this.createThirdRow({ num: 6, xStart: -60, spacing: 55, yStart: 90, counter: 3 });
	    this.createFourthRow({ num: 5, xStart: -60, spacing: 55, yStart: 130, counter: 3 });
	  }
	};

	Game.prototype.removeMessageDisplay = function () {
	  $('.start-game').on('click', function () {
	    this.blocks = [];
	    $('.message').css('display', 'none');
	    this.ball.resetBall();
	    startGameTrigger = true;
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
	};

	Game.prototype.resetGame = function () {
	  $('.start-new-game').on('click', function () {
	    this.blocks = [];
	    $('.message').css('display', 'none');
	    this.ball.resetBall();
	    this.ball.lives = 3;
	    gameScore = 0;
	    this.level = 0;
	  });
	};

	Game.prototype.gameOver = function () {
	  if (this.ball.lives === 0) {
	    $('.game-over').css('display', 'flex');
	    this.removeMessageDisplay();
	    this.resetGame();
	    this.ball.lives = 3;
	  }
	};

	module.exports = Game;

/***/ }
/******/ ]);