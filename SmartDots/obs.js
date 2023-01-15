let coords = [
  [400, 300, 400, 10],
  [0, 450, 500, 10],
  [0, 150, 500, 10],
];

class Obs {
  constructor() {}

  show() {
    for (let coord of coords) {
      rect(coord[0], coord[1], coord[2], coord[3]);
    }
  }

  hit(pos) {
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
}
