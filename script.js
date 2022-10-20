let cubes = [];
let zeroCube = null;
let size = 4;

let restartBtn = document.querySelector(".restart");

function getRow(pos) {
  return Math.floor(pos / size);
}

function getCol(pos) {
  return pos % size;
}

class GameArea {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Cube {
  constructor(width, height, x, y, value, gameArea) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.value = value;
    this.gameArea = gameArea;
  }
  update() {
    if (
      this.gameArea.x &&
      this.gameArea.y &&
      this.clicked() &&
      ((Math.abs(zeroCube.x - this.x) == 100 && zeroCube.y == this.y) ||
        (Math.abs(zeroCube.y - this.y) == 100 && zeroCube.x == this.x))
    ) {
      let x = zeroCube.x;
      let y = zeroCube.y;

      zeroCube.x = this.x;
      zeroCube.y = this.y;

      this.x = x;
      this.y = y;
    }

    const ctx = this.gameArea.context;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.font = "48px serif";
    ctx.fillText(this.value, this.x + 10, this.y + 50);
  }
  clicked() {
    let myleft = this.x;
    let myright = this.x + this.width;
    let mytop = this.y;
    let mybottom = this.y + this.height;
    let clicked = true;
    if (
      mybottom < this.gameArea.y ||
      mytop > this.gameArea.y ||
      myright < this.gameArea.x ||
      myleft > this.gameArea.x
    ) {
      clicked = false;
    }
    return clicked;
  }
}

const area = new GameArea();
window.addEventListener("click", function (e) {
  area.x = e.pageX;
  area.y = e.pageY;
  updateGameArea(); // FIXME:
});

function startGame() {
  cubes = []; // FIXME:
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];

  values = values.sort(() => Math.random() - 0.5);
  for (let index in values) {
    let value = values[index];
    let cube = new Cube(
      100,
      100,
      getRow(index) * 100,
      getCol(index) * 100,
      value,
      area
    );

    if (value === " ") {
      zeroCube = cube;
    }

    cubes.push(cube);
  }
}

function updateGameArea() {
  area.clear();

  for (let cube of cubes) {
    cube.update();
  }
}

startGame();

restartBtn.addEventListener("click", () => {
  startGame();
});
