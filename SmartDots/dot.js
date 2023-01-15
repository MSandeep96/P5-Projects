class Dot {
  pos;
  vel;
  acc;
  brain;
  fitness;
  lastBest = false;

  dead = false;
  reachedGoal = false;

  constructor() {
    this.pos = createVector(width / 2, height - 10);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.brain = new Brain(1000);
  }

  show() {
    let rad = 4;
    if (this.lastBest) {
      fill(0, 255, 0);
      rad = 16;
    } else {
      fill(0);
    }
    ellipse(this.pos.x, this.pos.y, rad, rad);
  }

  move() {
    if (this.brain.step < this.brain.directions.length) {
      this.acc = this.brain.directions[this.brain.step++];
    } else {
      this.dead = true;
    }
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
  }

  update() {
    if (this.dead || this.reachedGoal) return;
    this.move();
    if (
      this.pos.x < 2 ||
      this.pos.y < 2 ||
      this.pos.x > width - 2 ||
      this.pos.y > height - 2
    ) {
      this.dead = true;
      return;
    }
    if (obs.hit(this.pos)) {
      this.dead = true;
      return;
    }
    if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {
      this.reachedGoal = true;
    }
  }

  calcFitness() {
    if (this.reachedGoal) {
      this.fitness = 1 / 16 + 1000 / (this.brain.step * this.brain.step);
      return;
    }
    let distToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
    this.fitness = 1 / (distToGoal * distToGoal);
  }

  createChild() {
    let babe = new Dot();
    babe.brain = this.brain.clone();
    return babe;
  }
}
