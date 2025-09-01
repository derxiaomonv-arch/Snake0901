class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.speedSlider = document.getElementById('speedSlider');
        this.speedValue = document.getElementById('speedValue');
        
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        this.baseSpeed = 200; // 默认速度（调整为更舒适的初始速度）
        
        this.reset();
        this.bindEvents();
        this.loadHighScore();
        this.loadSpeedSetting();
    }
    
    reset() {
        this.snake = [
            {x: 10, y: 10}
        ];
        this.dx = 0;
        this.dy = 0;
        this.food = this.generateFood();
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.currentSpeed = parseInt(this.speedSlider.value);
        this.updateScore();
        this.draw();
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        return newFood;
    }
    
    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.speedSlider.addEventListener('input', (e) => this.updateSpeed(e.target.value));
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const key = e.key.toLowerCase();
        
        switch(key) {
            case 'arrowup':
            case 'w':
                if (this.dy !== 1) {
                    this.dx = 0;
                    this.dy = -1;
                }
                break;
            case 'arrowdown':
            case 's':
                if (this.dy !== -1) {
                    this.dx = 0;
                    this.dy = 1;
                }
                break;
            case 'arrowleft':
            case 'a':
                if (this.dx !== 1) {
                    this.dx = -1;
                    this.dy = 0;
                }
                break;
            case 'arrowright':
            case 'd':
                if (this.dx !== -1) {
                    this.dx = 1;
                    this.dy = 0;
                }
                break;
        }
    }
    
    startGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.startBtn.textContent = '游戏中...';
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.gameLoop();
        }
    }
    
    togglePause() {
        if (this.gameRunning) {
            this.gamePaused = !this.gamePaused;
            this.pauseBtn.textContent = this.gamePaused ? '继续' : '暂停';
            if (!this.gamePaused) {
                this.gameLoop();
            }
        }
    }
    
    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;
        
        this.clear();
        this.move();
        
        if (this.checkCollision()) {
            this.gameOver();
            return;
        }
        
        this.checkFood();
        this.draw();
        
        setTimeout(() => this.gameLoop(), this.currentSpeed);
    }
    
    clear() {
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    move() {
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        this.snake.unshift(head);
        
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }
    
    checkCollision() {
        const head = this.snake[0];
        
        // 检查墙壁碰撞
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        
        // 检查自身碰撞
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    checkFood() {
        const head = this.snake[0];
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
        }
    }
    
    draw() {
        this.clear();
        
        // 绘制蛇
        this.ctx.fillStyle = '#667eea';
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // 蛇头
                this.ctx.fillStyle = '#764ba2';
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
                
                // 绘制蛇眼睛
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(segment.x * this.gridSize + 5, segment.y * this.gridSize + 5, 4, 4);
                this.ctx.fillRect(segment.x * this.gridSize + 11, segment.y * this.gridSize + 5, 4, 4);
            } else {
                // 蛇身
                this.ctx.fillStyle = '#667eea';
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            }
        });
        
        // 绘制食物
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
        
        // 绘制网格
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        if (this.score > this.getHighScore()) {
            this.setHighScore(this.score);
            this.highScoreElement.textContent = this.score;
        }
    }
    
    getHighScore() {
        return parseInt(localStorage.getItem('snakeHighScore') || '0');
    }
    
    setHighScore(score) {
        localStorage.setItem('snakeHighScore', score.toString());
    }
    
    loadHighScore() {
        this.highScoreElement.textContent = this.getHighScore();
    }
    
    updateSpeed(newSpeed) {
        this.currentSpeed = parseInt(newSpeed);
        this.speedValue.textContent = `${newSpeed}ms`;
        localStorage.setItem('snakeSpeed', newSpeed);
    }
    
    loadSpeedSetting() {
        const savedSpeed = localStorage.getItem('snakeSpeed');
        if (savedSpeed) {
            this.speedSlider.value = savedSpeed;
            this.currentSpeed = parseInt(savedSpeed);
            this.speedValue.textContent = `${savedSpeed}ms`;
        } else {
            this.currentSpeed = this.baseSpeed;
            this.speedValue.textContent = `${this.baseSpeed}ms`;
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.startBtn.textContent = '开始游戏';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = '暂停';
        
        // 游戏结束动画
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏结束!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`最终得分: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new SnakeGame();
});