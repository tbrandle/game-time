const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/ball');

describe('Ball', function () {

  it('should create a ball object', function () {
    assert.isFunction(Ball);
  });

  it('should have a default x position', function() {
    var ball = new Ball({context: {}, canvas:{width: 400}});
    assert.equal(ball.x, 200);
  });

  it('should have a default y position', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.y, 260);
  });

  it('should have a radius of 6', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.radius, 6);
  });

  it('should have a start angle of 0', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.startAngle, 0);
  });

  it('should have an end angle of 6.283', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.endAngle, (2 * Math.PI));
  });

  it('should have a default speed of 3', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.speed, 3);
  });

  it('should have a lateral speed of 3', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.dx, 3);
  });

  it('should have a vertical speed of -3', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.dy, -3);
  });

  it('should start with three lives', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.lives, 3);
  });

  it('should start with a game score of 0', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.gameScore, 0);
  });

  it('should have a default color of black', function() {
    var ball = new Ball({context: {}, canvas:{}});
    assert.equal(ball.color, '#000000');
  })
})

describe('Ball prototypes', function () {
  var ball = new Ball({context: {}, canvas:{width: 400, height: 300}});

  it('should have a method called "drawBall()"', function() {
    assert.isFunction(ball.drawBall);
  })

  it('should have a method called "move()"', function() {
      assert.isFunction(ball.move)
  });

  it('should increase x position by 3 and decrease y position by 3', function () {
    ball.move();
    assert.equal(ball.x, 203);
    assert.equal(ball.y, 257);
  });

})
