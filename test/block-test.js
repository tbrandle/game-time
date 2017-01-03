var assert = require('chai').assert;
var Block = require('../lib/block');

describe('block contructor', function() {

  it('creates new blocks', function() {
    assert.isFunction(Block);
  });
});
