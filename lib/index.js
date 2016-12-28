var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var blocks = []

function Block(x, y) {
  this.x = x || 0;
  this.y = y || 10;
  this.width = 50;
  this.height = 15;
}

Block.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

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
  blocks.forEach(function (block) {
    block.draw();
  })
  requestAnimationFrame(gameLoop);
});
