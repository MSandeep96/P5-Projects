let minesweeper;
let gridW = 600,
  gridH = 600;
let cellW = 30,
  cellH = 30;
let vCells = gridW / cellW;
let hCells = gridH / cellH;

setup = () => {
  createCanvas(600, 600);
  strokeWeight(0);
  minesweeper = new MineSweeper();
};

draw = () => {
  clear();
  minesweeper.draw();
};

mousePressed = () => {
  let x = floor(mouseX / cellW);
  let y = floor(mouseY / cellH);
  minesweeper.click(x, y);
};

keyPressed = () => {
  if (keyCode === 82) {
    minesweeper.setup();
  }
};
