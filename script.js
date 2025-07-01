const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const blockSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = spawnFood();
let dx = blockSize;
let dy = 0;
let score = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * canvas.width / blockSize) * blockSize,
    y: Math.floor(Math.random() * canvas.height / blockSize) * blockSize
  };
}

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(block => ctx.fillRect(block.x, block.y, blockSize, blockSize));
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (checkCollision()) {
    alert("Game Over! Score: " + score);
    document.location.reload();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -blockSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = blockSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -blockSize; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = blockSize; dy = 0;
  }
});

setInterval(gameLoop, 100);
