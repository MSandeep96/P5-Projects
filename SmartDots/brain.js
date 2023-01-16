class Brain {
  directions;
  step;

  constructor(vecCount) {
    this.directions = Array(vecCount);
    this.step = 0;
    this.randomize();
  }

  getRandomDir() {
    let randomAngle = random(2 * PI);
    return p5.Vector.fromAngle(randomAngle);
  }

  randomize() {
    for (let i = 0; i < this.directions.length; i++) {
      this.directions[i] = this.getRandomDir();
    }
  }

  mutate(mutationRate) {
    console.log(mutationRate);
    for (let i = 0; i < this.directions.length; i++) {
      let rand = random(1);
      if (rand < mutationRate) {
        this.directions[i] = this.getRandomDir();
      }
    }
  }

  clone() {
    let newBrain = new Brain();
    newBrain.directions = [...this.directions];
    return newBrain;
  }

  cross(otherBrain) {
    let newBrain = new Brain();
    for (let i = 0; i < this.directions.length; i++) {
      newBrain.directions[i] =
        random() > 0.5 ? otherBrain.directions[i] : this.directions[i];
    }
    return newBrain;
  }
}
