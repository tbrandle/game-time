var assert = require('chai').assert;
var Ball = require('../lib/ball');

describe('Ball', function () {

  it('should create a ball object', function () {
    assert.isFunction(Ball);
  });
});

describe('ball prototypes', function () {

  it('should have a method called "drawBall()"', function () {
    var ball = new Ball;
    assert.isFunction(ball.drawBall);
  })
  it.skip('"drawBall()" should draw a circle on the canvas', function () {

  })

  it.skip('should have a method called "move()"', function () {

  })
  it.skip('"move()" should move increase the speed of the ball by this.dx and this.dy', function () {

  })


})
