const chai = require('chai');
const assert = chai.assert;

const Paddle = require('../lib/paddle');

describe('paddle object contructor', function() {

  it('create paddle', function() {
    assert.isFunction(Paddle);
  });
  it('should have default y position', function() {
    var paddle = new Paddle({context: {}, canvas: {width: 400}});
    assert.equal(paddle.y, 275);
  })
});
