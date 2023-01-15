let pop, goal, obs;

function setup() {
  frameRate(240);
  createCanvas(700, 700);
  pop = new Population(500);
  goal = createVector(350, 10);
  obs = new Obs();
}

function draw() {
  background(255);
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);
  text(pop.gen, 10, 10);
  text(pop.minStep, 10, 30);
  fill(0, 0, 255);
  obs.show();
  if (pop.allDotsDead()) {
    pop.calcFitness();
    pop.naturalSelection();
  } else {
    pop.update();
    pop.show();
  }
}
