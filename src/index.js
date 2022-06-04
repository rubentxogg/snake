import { SnakePart } from "./snake-part/SnakePart.js";
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
var speed = 7;
var tileCount = 20;
var tileSize = canvas.width / tileCount - 2;
var headX = 10;
var headY = 10;
var snakeParts = [];
var tailLength = 2;
var appleX = 5;
var appleY = 5;
var xVelocity = 0;
var yVelocity = 0;
var score = 0;
var gulpSound = new Audio("./assets/sounds/gulp.mp3");
function drawGame() {
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
function isGameOver() {
    var gameOver = false;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    // Walls
    if (headX < 0 || headY < 0 || headX === tileCount || headY === tileCount) {
        gameOver = true;
    }
    for (var _i = 0, snakeParts_1 = snakeParts; _i < snakeParts_1.length; _i++) {
        var part = snakeParts_1[_i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        ctx.fillStyle = "White";
        ctx.font = "50px Verdana";
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score ".concat(score), canvas.width - 50, 10);
}
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillStyle = "green";
    for (var _i = 0, snakeParts_2 = snakeParts; _i < snakeParts_2.length; _i++) {
        var part = snakeParts_2[_i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        speed++;
        gulpSound.play();
    }
}
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
document.addEventListener("keydown", keyDown);
function keyDown(event) {
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
