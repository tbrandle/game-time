const chai = require('chai');
const assert = chai.assert;

const Block = require('../lib/block');

describe('block', function() {
  context('with default attributes', function() {
    it('creates new blocks', function() {
      assert.isFunction(Block);
    });
    it('should have default x coordinate of 0', function() {
      var block = new Block({});      
      assert.equal(block.x, 0);
    });
  })
});
