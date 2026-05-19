
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;


const circle = function (x, y, radius, fillCircle, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

const colors = ["red", "blue", "green", "orange", "purple"];

const Ball = function () {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.radius = 10;
    this.color = "black";
    this.speed = 5;
};


Ball.prototype.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x - this.radius < 0 || this.x + this.radius > width) {
        this.xSpeed = -this.xSpeed;
    }

    if (this.y - this.radius < 0 || this.y + this.radius > height) {
        this.ySpeed = -this.ySpeed;
    }
};

Ball.prototype.draw = function (color) {
    circle(this.x, this.y, this.radius, true, color);
};

Ball.prototype.setAction = function (action) {
    if (action === "up") {
        this.xSpeed = 0;
        this.ySpeed = -this.speed;
    } else if (action === "down") {
        this.xSpeed = 0;
        this.ySpeed = this.speed;
    } else if (action === "left") {
        this.xSpeed = -this.speed;
        this.ySpeed = 0;
    } else if (action === "right") {
        this.xSpeed = this.speed;
        this.ySpeed = 0;
    } else if (action === "stop") {
        this.xSpeed = 0;
        this.ySpeed = 0;
    } else if (action === "color") {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        ball.draw(randomColor);
    }
};

Ball.prototype.changeSize = function (change) {
    this.radius += change;
    if (this.radius < 5) this.radius = 5;
};


Ball.prototype.changeSpeed = function (change) {
    this.speed += change;
    if (this.speed < 1) this.speed = 1;


    if (this.xSpeed !== 0) {
        this.xSpeed = this.xSpeed > 0 ? this.speed : -this.speed;
    }
    if (this.ySpeed !== 0) {
        this.ySpeed = this.ySpeed > 0 ? this.speed : -this.speed;
    }
};


const ball = new Ball();

const keyActions = {
    32: "stop",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    90: "slowDown",
    88: "speedUp",
    67: "decreaseSize",
    86: "increaseSize",
    69: "color",
};


$("body").keydown(function (event) {
    const action = keyActions[event.keyCode];
    if (action === "slowDown") {
        ball.changeSpeed(-1);
    } else if (action === "speedUp") {
        ball.changeSpeed(1);
    } else if (action === "decreaseSize") {
        ball.changeSize(-1);
    } else if (action === "increaseSize") {
        ball.changeSize(1);
    } else {
        ball.setAction(action);
    }
});

setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    ball.draw();
    ball.move();

    ctx.strokeRect(0, 0, width, height);
}, 30);
