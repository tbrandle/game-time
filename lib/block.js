function Block(options) {
  this.x =  options.x || 0;
  this.y =  options.y || 10;
  this.width =  options.width || 50;
  this.height =  options.height || 15;
  this.counter =  options.counter || 1;
  this.context = options.context;
  this.color = '#eac761';
  this.type = "block"
}

Block.prototype.draw = function () {
  this.context.fillStyle = this.color;
  if (this.counter === 3) {
    this.color = "#f75e50"
  }
  if (this.counter === 2) {
    this.color = "#eac761"
  }
  if (this.counter === 1) {
    this.color = "#7d7769"
  }
  this.context.fillRect(this.x, this.y, this.width, this.height);
    return this;
}

Block.prototype.remove = function (ball) {
  if (this.counter <= 0) {
    this.context.clearRect(this.x, this.y, this.width, this.height)
    this.height = 0;
    this.width = 0;
  } else {
    this.counter--;
  }
};

module.exports = Block;
