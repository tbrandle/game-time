const chai = require('chai');
const assert = chai.assert;

const Paddle = require('../lib/paddle');

describe('Paddle', function() {

  it('create paddle', function() {
    assert.isFunction(Paddle);
  });

  it('should have a default x position', function() {
    var paddle = new Paddle({context: {}, canvas: {width: 400}});
    assert.equal(paddle.x, 150);
  });

  it('should have a default y position', function() {
    var paddle = new Paddle({context: {}, canvas: {width: 400}});
    assert.equal(paddle.y, 275);
  });

  it('should have a default width', function() {
    var paddle = new Paddle({context: {}, canvas: {}});
    assert.equal(paddle.width, 100);
  });

  it('should have a default height', function() {
    var paddle = new Paddle({context: {}, canvas: {}});
    assert.equal(paddle.height, 10);
  });

  it('should have a default color', function() {
    var paddle = new Paddle({context: {}, canvas: {}});
    assert.equal(paddle.color, '#91c09e');
  })

});
