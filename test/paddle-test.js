var assert = require('chai').assert;
var Paddle = require('../lib/paddle');

describe('paddle object contructor', function() {

  it('create paddle', function() {
    assert.isFunction(Paddle);
  });
});
