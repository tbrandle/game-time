const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/levels');
const Ball = require('../lib/ball');
const Paddle = require('../lib/paddle');
const Block = require('../lib/block');

describe('Levels', function() {

  it('should create an object called Game', function() {
    assert.isFunction(Game);
  });

  it('should have an empty array of blocks by default', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    assert.deepEqual(game.blocks, []);
  });

  it('should have a default level of 0', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    assert.equal(game.level, 0);
  });

  it('should instantiate a new ball', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    assert.isObject(game.ball, new Ball({}))
  })

  it('should instantiate a new paddle', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    assert.isObject(game.paddle, new Paddle({}))
  });

  it('should have a method called createRow', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    assert.isFunction(game.createRow);
  });

  it('should take an object as an argument', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    assert.equal(game.createRow({}));
  });

  it('should give block a default x position', function() {
    var game = new Game({context: {}, canvas: {width: 400}});
    game.createRow({block});
    assert.equal(game.xStart, 150);
  })

})