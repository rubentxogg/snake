var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
var speed = 7;
var tileCount = 20;
var tileSize = canvas.width / tileCount - 2;
var headX = 10;
var headY = 10;
var xVelocity = 0;
var yVelocity = 0;
function drawGame() {
    clearScreen();
    changeSnakePosition();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
document.addEventListener('keydown', keyDown);
function keyDown(event) {
    // Up
    if (event.keyCode === 38) {
        yVelocity = -1;
        xVelocity = 0;
    }
    // Down
    if (event.keyCode === 40) {
        yVelocity = 1;
        xVelocity = 0;
    }
    // Left
    if (event.keyCode === 37) {
        yVelocity = 0;
        xVelocity = -1;
    }
    // Right
    if (event.keyCode === 39) {
        yVelocity = 0;
        xVelocity = 1;
    }
}
drawGame();
