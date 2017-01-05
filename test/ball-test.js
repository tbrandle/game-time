const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/ball');

describe('Ball', function () {

  it('should create a ball object', function () {
    assert.isFunction(Ball);
  });
});

describe('ball prototypes', function () {
  var ball = new Ball({context: {}, canvas:{width: 400, height: 300}});

  it('should have a method called "drawBall()"', function () {
    assert.isFunction(ball.drawBall);
  })

  it('should have a method called "move()"', function () {
      assert.isFunction(ball.move)
  })
  it('"move()" should move increase the speed of the ball by this.dx and this.dy', function () {

    ball.move();

    assert.equal(ball.x, 202);
    assert.equal(ball.y, 148);
  })


})

// var ball = new Ball ({x: 10, y: 10,, context: {} canvas:{width: 500, height: 300}})
