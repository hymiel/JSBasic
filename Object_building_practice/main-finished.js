// Canvas 설정
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 랜덤 숫자 생성 함수
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤 RGB 색상 생성 함수
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball 클래스 정의
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.exists = true;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {
            this.velX = -Math.abs(this.velX);
        }
        if (this.x - this.size <= 0) {
            this.velX = Math.abs(this.velX);
        }
        if (this.y + this.size >= height) {
            this.velY = -Math.abs(this.velY);
        }
        if (this.y - this.size <= 0) {
            this.velY = Math.abs(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// Shape 클래스 정의
class Shape extends Ball {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY, color, size);
        this.exists = true;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// EvilCircle 클래스 정의
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20, 'white', 10);
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'a':
                    this.x -= this.velX;
                    break;
                case 'd':
                    this.x += this.velX;
                    break;
                case 'w':
                    this.y -= this.velY;
                    break;
                case 's':
                    this.y += this.velY;
                    break;
            }
        });
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    update() {
        if (this.x + this.size > width) {
            this.x = width - this.size;
        }
        if (this.x - this.size < 0) {
            this.x = this.size;
        }
        if (this.y + this.size > height) {
            this.y = height - this.size;
        }
        if (this.y - this.size < 0) {
            this.y = this.size;
        }
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false; // 공을 사라지게 함
                }
            }
        }
    }
}

// 공 초기화
const balls = [];
while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );
    balls.push(ball);
}

// EvilCircle 초기화
const evilCircle = new EvilCircle(random(0, width), random(0, height));

// 점수 업데이트 함수
function updateScore() {
    const score = balls.filter(ball => ball.exists).length;
    document.getElementById('score').textContent = `Ball count: ${score}`;
}

// 애니메이션 루프
function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    evilCircle.draw();
    evilCircle.update();
    evilCircle.collisionDetect();

    updateScore();
    requestAnimationFrame(loop);
}

loop();
