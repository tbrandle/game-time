function levelPass() {
  var blockHeight = blocks.every(checkHeight);
  function checkHeight(blocks) {
    if (blocks.height !== 0) {
      return false;
    } else {
      return true;
    }
  }
  if (blockHeight === true && level < 4 && level >= 0) {
    level++;
    ball.startGameTrigger = false;
    $('.level-pass').css('display', 'flex');
    $('.level').text('Level ' + level);
    levels();
    removeMessageDisplay();
  } else if (blockHeight === true && level === 4) {
      $('.winner').css('display', 'flex');
      $('.level-pass').css('display', 'none');
      resetGame();
    }
  }

function resetGame() {
  $('.start-new-game').on('click', function() {
    blocks = [];
    $('.message').css('display', 'none');
    ball.moveBallTrigger = false;
    ball.lives = 3;
    ball.gameScore = 0;
    level = 0;
  });
}

function gameOver() {
  if (ball.lives === 0) {
    $('.game-over').css('display', 'flex');
    removeMessageDisplay();
    resetGame();
    ball.lives = 3;
  }
}

function removeMessageDisplay() {
  $('.start-game').on('click', function() {
    // blocks = [];
    $('.message').css('display', 'none');
    ball.moveBallTrigger = false;
    ball.startGameTrigger = true;
    ball.gameScore = 0;
  });
}
