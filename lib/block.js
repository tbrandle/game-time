function Block(options) {
  this.x =  options.x || 0;
  this.y =  options.y ||10;
  this.width =  options.width ||50;
  this.height =  options.height ||15;
  this.context = options.context;
}

Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

module.exports = Block;
