class MineSweeper {
  board;
  minecount;
  mineCoords;
  gameover = false;
  exposed;

  constructor() {
    this.setup();
  }

  setup() {
    this.minecount = 50;
    this.exposed = vCells * hCells - this.minecount;
    this.gameover = false;
    this.board = Array(vCells)
      .fill()
      .map(() => Array(hCells).fill(-1));
    this.mineCoords = new Set();
    for (let i = 0; i < this.minecount; i++) {
      let cellIdx;
      do {
        cellIdx = floor(random(vCells * hCells));
      } while (this.mineCoords.has(cellIdx));
      this.mineCoords.add(cellIdx);
    }
  }

  draw() {
    for (let i = 0; i < vCells; i++) {
      for (let j = 0; j < hCells; j++) {
        let col;
        if (
          mouseX > i * cellW &&
          mouseX < i * cellW + cellW &&
          mouseY > j * cellH &&
          mouseY < j * cellH + cellH &&
          this.board[i][j] === -1
        ) {
          col = color(180, 225, 91);
        } else if (this.board[i][j] === -1) {
          if ((i + j) % 2 === 0) col = color(170, 215, 81);
          else col = color(162, 209, 73);
        } else if (this.board[i][j] === -2) {
          col = color(255, 0, 0);
        } else {
          if ((i + j) % 2 === 0) col = color(229, 194, 159);
          else col = color(215, 184, 153);
        }
        fill(col);
        rect(i * cellW, j * cellH, cellW, cellH);
        if (this.board[i][j] > 0) {
          fill(0);
          textSize(20);
          text(this.board[i][j], i * cellW + 10, j * cellH + 20);
        }
      }
    }
    if (this.exposed === 0) {
      fill(255);
      textSize(64);
      text("You Win", 120, 300);
    }
    if (this.gameover) {
      fill(255);
      textSize(64);
      text("Game Over", 120, 300);
    }
  }

  click(x, y) {
    if (this.gameover || this.exposed === 0) return;
    if (this.mineCoords.has(x * vCells + y)) {
      this.gameover = true;
      this.board[x][y] = -2;
      return;
    }
    this.explore(x, y);
  }

  explore(x, y) {
    if (x < 0 || x >= vCells || y < 0 || y >= hCells) return;
    if (this.board[x][y] !== -1) return;
    if (this.mineCoords.has(x * vCells + y)) return;
    let count = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (this.mineCoords.has((x + j) * vCells + (y + i))) count++;
      }
    }
    this.board[x][y] = count;
    this.exposed--;
    if (count === 0) {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          this.explore(x + i, y + j);
        }
      }
    }
  }
}
