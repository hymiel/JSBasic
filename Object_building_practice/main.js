// 기본 설정
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 무작위 색상 생성 함수
function generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// 무작위 숫자 생성 함수
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 공 객체 생성 함수
function createBall() {
    return {
        x: generateRandomNumber(0, canvas.width),
        y: generateRandomNumber(0, canvas.height),
        dx: generateRandomNumber(-5, 5),
        dy: generateRandomNumber(-5, 5),
        size: generateRandomNumber(10, 20),
        color: generateRandomColor(),

        // 공을 그리는 함수
        draw: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        },

        // 공의 위치를 업데이트하는 함수
        update: function() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
        },

        // 공이 다른 공과 충돌하는지 확인하는 함수
        checkCollision: function(balls) {
            balls.forEach(otherBall => {
                if (this !== otherBall) {
                    const dx = this.x - otherBall.x;
                    const dy = this.y - otherBall.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.size + otherBall.size) {
                        this.color = generateRandomColor();
                        otherBall.color = generateRandomColor();
                    }
                }
            });
        }
    };
}

// 공들을 저장할 배열
const balls = [];
for (let i = 0; i < 25; i++) {
    balls.push(createBall());
}

// 애니메이션 루프 함수
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.draw();
        ball.update();
        ball.checkCollision(balls);
    });

    requestAnimationFrame(animate);
}

// 애니메이션 시작
animate();
