var assert = require('chai').assert;
var Ball = require('../lib/ball');

describe('Ball is a constructor function', function () {

  it('should create a ball object', function () {
    assert.isFunction(Ball);
  });
});
