class SnakeGame {
  gameStart = false;
  gameOver = false;
  curr;
  food;
  dir = createVector(1, 0);

  blockSize = 20;
  gridSize = 35;

  constructor() {
    this.reset();
  }

  startGame() {
    if (this.gameOver) {
      this.reset();
    }
    this.gameStart = true;
  }

  reset() {
    this.gameStart = false;
    this.gameOver = false;
    this.curr = new LinkedList();
    this.curr.pushFront(createVector(17, 17));
    this.setFood();
  }

  setFood() {
    this.food = createVector(
      floor(random(this.gridSize)),
      floor(random(this.gridSize))
    );
  }

  update() {
    if (!this.gameStart || this.gameOver) return;
    const head = this.curr.head.value;
    const newHead = head.copy().add(this.dir);
    if (
      newHead.x < 0 ||
      newHead.x >= this.gridSize ||
      newHead.y < 0 ||
      newHead.y >= this.gridSize
    ) {
      this.gameOver = true;
      return;
    }
    for (const coordVec of this.curr.values()) {
      if (newHead.x === coordVec.x && newHead.y === coordVec.y) {
        this.gameOver = true;
        return;
      }
    }
    this.curr.pushFront(newHead);
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.setFood();
    } else {
      this.curr.popBack();
    }
  }

  draw() {
    fill(0, 255, 0);
    for (const coordVec of this.curr.values()) {
      this.drawRect(coordVec);
    }
    this.drawRect(this.food);
  }

  drawRect(coordVec) {
    rect(
      coordVec.x * this.blockSize + 20,
      coordVec.y * this.blockSize + 20,
      this.blockSize,
      this.blockSize
    );
  }
}
