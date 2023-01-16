let coords = [
  [300, 400, 400, 10],
  // [0, 450, 500, 10],
  [0, 500, 500, 10],
];

let timeout = 7000;

class Obs {
  startTime = new Date();
  constructor() {}

  show() {
    if (new Date() - this.startTime > timeout) {
      return;
    }
    for (let coord of coords) {
      rect(coord[0], coord[1], coord[2], coord[3]);
    }
  }

  hit(pos) {
    if (new Date() - this.startTime > timeout) {
      return false;
    }
    for (let coord of coords) {
      if (
        pos.x > coord[0] &&
        pos.y > coord[1] &&
        pos.x < coord[0] + coord[2] &&
        pos.y < coord[1] + coord[3]
      ) {
        return true;
      }
    }
    return false;
  }

  reset() {
    this.startTime = new Date();
  }
}
