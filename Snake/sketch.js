let w = (h = 740);
let snakeGame;
let currTime = new Date().getTime();
let tSize = 40;

setup = () => {
  createCanvas(w, h);
  strokeWeight(0);
  textSize(tSize);
  snakeGame = new SnakeGame();
};

drawBg = () => {
  rectMode(CORNERS);
  fill(0, 255, 0);
  rect(0, 0, w, h);
  fill(0);
  rect(20, 20, w - 20, h - 20);
  rectMode(CORNER);
};

draw = () => {
  if (new Date().getTime() - currTime < Math.max(101 - snakeGame.curr.size, 30))
    return;
  if (snakeGame.gameOver) {
    text("Game Over", 280, 380);
    text("Press R to restart", 280, 420);
    return;
  }
  currTime = new Date().getTime();
  select("#score").html(snakeGame.curr.size);
  drawBg();
  snakeGame.update();
  snakeGame.draw();
  if (!snakeGame.gameStart) {
    text("Press S to start", 280, 380);
    return;
  }
};

keyPressed = () => {
  if (keyCode === 83) {
    snakeGame.startGame();
    return;
  }
  if (keyCode === 82) {
    snakeGame.reset();
    return;
  }
  if (!snakeGame.gameStart || snakeGame.gameOver) return;
  if (keyCode === LEFT_ARROW) {
    snakeGame.dir = createVector(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snakeGame.dir = createVector(1, 0);
  } else if (keyCode === UP_ARROW) {
    snakeGame.dir = createVector(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snakeGame.dir = createVector(0, 1);
  }
};
