import { SnakePart } from "./snake-part/SnakePart.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let speed: number = 7;

let tileCount: number = 20;
let tileSize: number = canvas.width / tileCount - 2;
let headX: number = 10;
let headY: number = 10;
let snakeParts: SnakePart[] = [];
let tailLength = 2;

let appleX: number = 5;
let appleY: number = 5;

let xVelocity: number = 0;
let yVelocity: number = 0;

let score: number = 0;

const gulpSound = new Audio("./assets/sounds/gulp.mp3"); 

function drawGame(): void {
  clearScreen();
  changeSnakePosition();

  if (isGameOver()) {
    return;
  }

  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver(): boolean {
  let gameOver = false;

  if(yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  // Walls
  if (headX < 0 || headY < 0 || headX === tileCount || headY === tileCount) {
    gameOver = true;
  }

  for (let part of snakeParts) {
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "White";
    ctx.font = "50px Verdana";

    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1.0, "red");
    ctx.fillStyle = gradient;

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore(): void {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText(`Score ${score}`, canvas.width - 50, 10);
}

function clearScreen(): void {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(): void {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  ctx.fillStyle = "green";
  for (let part of snakeParts) {
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(): void {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    speed++;
    gulpSound.play();
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

document.addEventListener("keydown", keyDown);

function keyDown(event: { keyCode: number }): void {
  // Up
  if (event.keyCode === 38) {
    if (yVelocity === 1) {
      return;
    }
    yVelocity = -1;
    xVelocity = 0;
  }

  // Down
  if (event.keyCode === 40) {
    if (yVelocity === -1) {
      return;
    }
    yVelocity = 1;
    xVelocity = 0;
  }

  // Left
  if (event.keyCode === 37) {
    if (xVelocity === 1) {
      return;
    }
    yVelocity = 0;
    xVelocity = -1;
  }

  // Right
  if (event.keyCode === 39) {
    if (xVelocity === -1) {
      return;
    }
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
