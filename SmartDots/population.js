class Population {
  dots;
  fitnessSum;
  gen = 0;
  minStep = 1000;
  bestIndex = 0;

  constructor(size) {
    this.dots = Array.from({ length: size }, (e) => new Dot());
  }

  update() {
    for (let dot of this.dots) {
      if (dot.brain.step > this.minStep) {
        dot.dead = true;
        continue;
      }
      dot.update();
    }
  }

  show() {
    for (let dot of this.dots) {
      dot.show();
    }
  }

  calcFitness() {
    let sum = 0,
      max = 0;
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].calcFitness();
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        this.bestIndex = i;
        if (this.dots[i].reachedGoal) this.minStep = this.dots[i].brain.step;
      }
      sum += this.dots[i].fitness;
    }
    this.fitnessSum = sum;
  }

  allDotsDead() {
    for (let dot of this.dots) {
      if (!dot.dead && !dot.reachedGoal) return false;
    }
    return true;
  }

  naturalSelection() {
    let newDots = Array(this.dots.length);
    newDots[0] = this.dots[this.bestIndex].createChild();
    newDots[0].lastBest = true;
    let bestFitness = this.dots[this.bestIndex].fitness;
    for (let i = 1; i < newDots.length; i++) {
      let parent = this.selectParent();
      newDots[i] = parent.createChild();
      newDots[i].brain.mutate(0.01);
    }
    this.dots = newDots;
    this.gen++;
  }

  selectParent() {
    let rand = random(this.fitnessSum);
    let runningSum = 0;
    for (let i = 0; i < this.dots.length; i++) {
      runningSum += this.dots[i].fitness;
      if (runningSum > rand) return this.dots[i];
    }
    //blenk
  }
}
