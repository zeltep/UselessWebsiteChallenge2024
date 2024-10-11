const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

let radius = 0.03;

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill(); 
}

let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();
addEventListener("resize", resizeCanvas);

let balls = [];

function drawScreen() {
    ctx.clearRect(0, 0, width, height);

    for (const ball of balls) {
        const pixX = ball.posX * width;
        const pixY = ball.posY * height;
        const adjustedRadius = radius * canvas.height;

        drawCircle(pixX, pixY, adjustedRadius, ball.color);
    }
}

function gameTick() {
    for (const ball of balls) {
        ball.posX += ball.velX;
        ball.posY += ball.velY;
        

        const adjustedRadius = height/width * radius;

        if ((ball.posX - adjustedRadius) <= 0 || (ball.posX + adjustedRadius) >= 1) {
            ball.velX = -ball.velX;
        }

        if (ball.posY+adjustedRadius <= 1) {
            ball.velY += 0.0001;
        }
        else if(ball.velY > 0) {
            ball.velY = -ball.velY;
        }

        if ((ball.posY - adjustedRadius) <= 0 && ball.velY < 0) {
            ball.velY = -ball.velY;
        } 
    }
}

setInterval(drawScreen, 15);
setInterval(gameTick, 5);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

canvas.addEventListener("click", function(e) {
    const posX = (e.offsetX / width);
    const posY = (e.offsetY / height);
    const color = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`
    const velY = 0;
    const velX = (Math.random() * 0.002) - 0.001;
    console.log(velX)
    console.log(velY)
    balls.push({color:color, posX:posX, posY:posY, velY:velY, velX:velX});
});
