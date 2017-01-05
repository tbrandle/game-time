function Block(options) {
  this.x =  0;
  this.y =  10;
  this.width =  50;
  this.height =  15;
  this.context = options.context;
}

Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

module.exports = Block;
