const chai = require('chai');
const assert = chai.assert;

const Block = require('../lib/block');

describe('Block', function() {

    it('creates new blocks', function() {
      assert.isFunction(Block);
    });

    it('should have default x coordinate of 0', function() {
      var block = new Block({});
      assert.equal(block.x, 0);
    });

    it('should have default y coordinate of 10', function() {
      var block = new Block({});
      assert.equal(block.y, 10);
    });

    it('should have default width of 50', function() {
      var block = new Block({});
      assert.equal(block.width, 50);
    });

    it('should have default height of 15', function() {
      var block = new Block({});
      assert.equal(block.height, 15);
    });

    it('should have default counter set to 1', function() {
      var block = new Block({});
      assert.equal(block.counter, 1);
    });

    it('should have a method called remove', function() {
      var block = new Block({});
      assert.isFunction(block.remove);
    });
  });
