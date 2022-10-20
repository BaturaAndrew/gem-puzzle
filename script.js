let cubes = [];
let zeroCube = null;
let size = 4;

let restartBtn = document.querySelector(".restart");

console.log(cubes);

function getRow(pos) {
  return Math.floor(pos / size);
}

function getCol(pos) {
  return pos % size;
}

function startGame() {
  cubes = [];
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];

  values = values.sort(() => Math.random() - 0.5);
  for (let index in values) {
    let value = values[index];
    let cube = new component(
      100,
      100,
      getRow(index) * 100,
      getCol(index) * 100,
      value
    );

    if (value === " ") {
      zeroCube = cube;
    }

    cubes.push(cube);
  }

  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("click", function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, x, y, value) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.value = value;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.font = "48px serif";
    ctx.fillText(value, this.x + 10, this.y + 50);
  };
  this.clicked = function () {
    let myleft = this.x;
    let myright = this.x + this.width;
    let mytop = this.y;
    let mybottom = this.y + this.height;
    let clicked = true;
    if (
      mybottom < myGameArea.y ||
      mytop > myGameArea.y ||
      myright < myGameArea.x ||
      myleft > myGameArea.x
    ) {
      clicked = false;
    }
    return clicked;
  };
}
function getNull() {
  for (let cube of cubes) {
    console.log(cube);
  }
}
getNull();

function updateGameArea() {
  myGameArea.clear();

  for (let cube of cubes) {
    cube.update();

    if (
      myGameArea.x &&
      myGameArea.y &&
      cube.clicked() &&
      cube !== zeroCube &&
      ((Math.abs(zeroCube.x - cube.x) == 100 && zeroCube.y == cube.y) ||
        (Math.abs(zeroCube.y - cube.y) == 100 && zeroCube.x == cube.x))
    ) {
      let x = zeroCube.x;
      let y = zeroCube.y;

      zeroCube.x = cube.x;
      zeroCube.y = cube.y;

      cube.x = x;
      cube.y = y;
    }
  }
}

startGame();

restartBtn.addEventListener("click", () => {
  startGame();
});
