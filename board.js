(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Board = SnakeGame.Board = function() {
    this.snake1 = new SnakeGame.Snake();
    this.snake1.cssClass = 'snake1'
    this.snake2 = new SnakeGame.Snake();
    this.snake2.cssClass = 'snake2'
    this.makeBoard();
    this.placeFood();
    this.placeSnake(this.snake1);
    // this.placeSnake(this.snake2);


  }

  Board.prototype.collision = function(snake) {

    if (snake.segments[0].hasClass('food')) {
      snake.segments[0].toggleClass('food');
      snake.snakeLength += 3;
      this.placeOneFood();
    } else if (snakeCollision()) {
      window.clearInterval(this.intervalID)
      alert("You Lose")
    } else if (snake.segments[0].hasClass('tile')) {
      return;
    } else {
      window.clearInterval(this.intervalID)
      alert("You Lose")
    }

    function snakeCollision() {
      var collision = false
      for(var i = 1; i < snake.segments.length; i++){
        if (snake.segments[0].data("id") === snake.segments[i].data("id")) 
        {
          snake.segments[i].toggleClass('snake1');
          collision = true;
        }
      }
      return collision;
    }
  }

  Board.prototype.placeFood = function() {
    for (var i = 0; i < 20; i++) {
      this.placeOneFood();
    }
  }

  Board.prototype.placeOneFood = function() {
    var row = Math.floor(Math.random() * 24);
    var col = Math.floor(Math.random() * 19);
    console.log($('[data-id="' + row + "," + col + '"]').hasClass('snake1'))
    console.log($('[data-id="' + row + "," + col + '"]').hasClass('food'))

    if ($('[data-id="' + row + "," + col + '"]').hasClass('snake1') === false && $('[data-id="' + row + "," + col + '"]').hasClass('food') === false) {
      console.log($('[data-id="' + row + "," + col + '"]').hasClass('snake1'))
      $('[data-id="' + row + "," + col + '"]').addClass('food');
    } else {
      this.placeOneFood();
    }
  }

  Board.prototype.placeSnake = function(snake) {
    // var row = Math.floor(Math.random() * 25);
    // var col = Math.floor(Math.random() * 20);
    var row = 12;
    var col = 10;
    snake.segments.push($('[data-id="' + row + ","+ col + '"]'));
    $('[data-id="' + row + "," + col + '"]').toggleClass(snake.cssClass);
  }

  Board.prototype.makeBoard = function() {
    for (var row = 0; row < 20; row++) {
      for (var col = 0; col < 25; col++) {
        $('#board').append('<div class="tile" data-id="' + row + "," + col + '"></div>');
      }
    }
  };

  Board.prototype.play = function() {
    var board = this;
    board.keyBindings();
    this.intervalID = setInterval(function() {
      board.snake1.move();
      // board.snake2.move();
      board.collision(board.snake1);
      // board.collision(board.snake2);
    }, 200);
  };

  Board.prototype.keyBindings = function() {
    var board = this;
    // key('w', function() {
    //   board.snake1.dir = SnakeGame.Snake.DIRECTIONS[0];
    // });
    // key('s', function() {
    //   board.snake1.dir = SnakeGame.Snake.DIRECTIONS[1];
    // });
    // key('a', function() {
    //   board.snake1.dir = SnakeGame.Snake.DIRECTIONS[2];
    // });
    // key('d', function() {
    //   board.snake1.dir = SnakeGame.Snake.DIRECTIONS[3];
    // });
    key('up', function() {
      board.snake1.turn(SnakeGame.Snake.DIRECTIONS[0]);
    });
    key('down', function() {
      board.snake1.turn(SnakeGame.Snake.DIRECTIONS[1]);
    });
    key('left', function() {
      board.snake1.turn(SnakeGame.Snake.DIRECTIONS[2]);
    });
    key('right', function() {
      board.snake1.turn(SnakeGame.Snake.DIRECTIONS[3]);
    });
  }


})(this);