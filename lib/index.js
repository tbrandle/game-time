var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var blocks = []

function Block(x, y, width, height) {
  this.x = x || 0;
  this.y = y || 10;
  this.width = width || 50;
  this.height = height || 15;
}

Block.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

var paddle = new Block(20, 275, 100, 15);

function createFirstRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60))
  }
}
function createSecondRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60, 30))
  }
}
function createThirdRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60, 50))
  }
}
function createFourthRow(num) {
  this.x = -50
  for (var i = 0; i < num; i++) {
    blocks.push(new Block (x += 60, 70))
  }
}

createFirstRow(6);
createSecondRow(6);
createThirdRow(6)
createFourthRow(6)




requestAnimationFrame(function gameLoop() {
  paddle.draw();
  blocks.forEach(function (block) {
    block.draw();
  })
  requestAnimationFrame(gameLoop);
});
