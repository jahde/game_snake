var draw = function(snakeToDraw, apple) {
  var drawableSnake = { color: "green", pixels: snakeToDraw };
  var drawableApple = { color: "red", pixels: [apple] };
  var drawableObjects = [drawableSnake, drawableApple];
  CHUNK.draw(drawableObjects);
}

var moveSegment = function(segment) {
  switch(segment.direction) {
    case "down":
      return { top: segment.top + 1, left: segment.left };
    case "up":
      return { top: segment.top - 1, left: segment.left };
    case "right":
      return { top: segment.top, left: segment.left + 1 }
    case "left":
      return { top:segment.top, left: segment.left - 1 }
    default:
      return segment;
  }
}

var segmentFurtherForwardThan = function(index, snake) {
  return snake[index - 1] || snake[index];
}

var moveSnake = function(snake) {
  return snake.map(function(oldSegment, segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
    return newSegment;
  });
}

var growSnake = function(snake) {
  var indexOfLastSegment = snake.length - 1;
  var lastSegment = snake[snake.length - 1];
  snake.push({ top: lastSegment.top, left: lastSegment.left });
  return snake;
}

var ate = function(snake, otherThing) {
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var advanceGame = function() {
  var newSnake = moveSnake(snake);

  if (ate(newSnake, snake)) {
    CHUNK.endGame();
    CHUNK.flashMessage("Woops! You ate yourself!");
  }

  if (ate(newSnake, [apple])) {
    newSnake = growSnake(newSnake);
    apple = CHUNK.randomLocation();
  }

  if (ate(newSnake, CHUNK.gameBoundaries())) {

    CHUNK.endGame();
    alert("THE GAME IS ENDING")
    // console.log("THE GAME IS ENDING")
    // to see the error messages
    CHUNK.flashMessage("Woops! you hit a wall!");
    alert("THE FLASH MESSAGE SHOULD HAVE HAPPENED");
  }

  snake = newSnake;
  draw(snake, apple);
}

var changeDirection = function(direction) {
  snake[0].direction = direction;
}

var apple = CHUNK.randomLocation();
var snake = [{ top: 1, left: 0, direction: "down" }, {top: 0, left: 0, direction: "down"}];

CHUNK.executeNTimesPerSecond(advanceGame, 1);
CHUNK.onArrowKey(changeDirection);

// this is a test

/*
// drawSnake(snake);
// var snake = [{ top: 0, left: 0}];

// var drawableSnake = { color: "red", pixels: snake };
// CHUNK.draw([drawableSnake]);

var drawSnake = function(snakeToDraw) {
  var drawableSnake = { color: "green", pixels: snakeToDraw };
  var drawableObjects = [drawableSnake];
  CHUNK.draw(drawableObjects);
}


var moveSegment = function(segment) {
  if (segment.direction == "down") {
    return { top: segment.top + 1, left: segment.left }
  } else if (segment.direction == "up") {
    return { top: segment.top - 1, left: segment.left }
  } else if (segment.direction == "right") {
    return { top: segment.top, left: segment.left + 1 }
  } else if (segment.direction == "left") {
    return { top:segment.top, left: segment.left - 1 }
  }
  return segment;
}

var segmentFurtherForwardThan = function(index, snake) {
  if (snake[index - 1] === undefined) {
    return snake[index];
  } else {
    return snake[index - 1];
  }
}

var moveSnake = function(snake) {
  var oldSegment = snake[0];
  var newSegment = moveSegment(oldSegment);
  newSegment.direction = oldSegment.direction;
  // var newSegment = { top: oldSegment.top + 1, left: oldSegment.left };
  var newSnake = [newSegment];
  return newSnake;
}

var moveSnake = function(snake) {
  var newSnake = [];
  snake.forEach(function(oldSegment) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = oldSegment.direction;
    newSnake.push(newSegment);
  });

  return newSnake
}

var growSnake = function(snake) {
  var tipOfTailIndex = snake.length - 1;
  var tipOfTail = snake[snake.length - 1];
  snake.push({ top: tipOfTail, left: tipOfTail.left });
  return snake;
}

var advanceGame = function() {
  snake = moveSnake(snake);
  if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("Woops! you hit a wall!");
  }
  drawSnake(snake);
}

var advanceGame = function() {
  snake = moveSnake(snake);
  if (CHUNK.detectCollisionBetween([apple], snake)) {
    snake = growSnake(snake);
    apple = CHUNK.randomLocation();
  }
  if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("Woops! you hit a wall!");
  }
  draw(snake, apple);
}

var apple = { top: 8, left: 10 };
*/
