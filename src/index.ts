const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let speed: number = 7;

let tileCount: number = 20;
let tileSize: number = canvas.width / tileCount - 2;
let headX: number = 10;
let headY: number = 10;

let appleX: number = 5;
let appleY: number = 5;

let xVelocity: number = 0;
let yVelocity: number = 0;

function drawGame(): void {
  clearScreen();
  changeSnakePosition();
  checkAppleCollision();
  drawApple();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
}

function clearScreen(): void {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(): void {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(): void {
  if(appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }
}

function drawApple(): void {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize); 
}

function changeSnakePosition(): void {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

document.addEventListener('keydown', keyDown);

function keyDown(event: { keyCode: number }): void {
  // Up
  if(event.keyCode === 38) {
    if(yVelocity === 1) {
      return;
    }
    yVelocity = -1;
    xVelocity = 0;
  }

  // Down
  if(event.keyCode === 40) {
    if(yVelocity === -1) {
      return;
    }
    yVelocity = 1;
    xVelocity = 0;
  }

  // Left
  if(event.keyCode === 37) {
    if(xVelocity === 1) {
      return;
    }
    yVelocity = 0;
    xVelocity = -1;
  }

  // Right
  if(event.keyCode === 39) {
    if(xVelocity === -1) {
      return;
    }
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
