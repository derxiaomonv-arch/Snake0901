# 贪吃蛇游戏

一个使用HTML5、CSS3和JavaScript构建的经典贪吃蛇游戏。
目前为版本一，9.1完成

## 游戏特性

- 🎮 经典贪吃蛇游戏玩法
- 🎯 实时计分系统
- 🏆 本地最高分记录
- ⏸️ 暂停/继续功能
- 📱 响应式设计，支持移动设备
- 🎨 现代化UI设计

## 游戏控制

- **方向键** 或 **WASD** 控制蛇的移动方向
- **开始游戏** 按钮开始新游戏
- **暂停** 按钮暂停/继续游戏
- **重置** 按钮重置游戏

## 游戏规则

1. 使用方向键控制蛇的移动
2. 吃到红色食物可以增长蛇身并获得10分
3. 避免撞到墙壁或自己的身体
4. 游戏结束时会显示最终得分

## 如何运行

### 方法1：直接打开HTML文件
1. 双击 `index.html` 文件，在浏览器中打开

### 方法2：使用本地服务器
#### 使用Python（推荐）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用Node.js
```bash
# 安装http-server（只需一次）
npm install -g http-server

# 启动服务器
http-server -p 8000
```

#### 使用PHP
```bash
php -S localhost:8000
```

启动服务器后，在浏览器中访问 `http://localhost:8000`

## 文件结构

```
Snake0901/
├── index.html      # 主HTML文件
├── style.css       # 样式文件
├── script.js       # 游戏逻辑
└── README.md       # 说明文档
```

## 技术栈

- **HTML5**: Canvas元素用于游戏渲染
- **CSS3**: 现代样式和响应式设计
- **JavaScript**: ES6+ 游戏逻辑和交互

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

游戏使用面向对象的方式编写，主要类包括：
- `SnakeGame`: 主游戏类，处理所有游戏逻辑
- 包含蛇的移动、碰撞检测、食物生成、计分等功能

## 自定义配置

您可以通过修改 `script.js` 文件中的以下参数来自定义游戏：

```javascript
// 游戏速度（毫秒）
setTimeout(() => this.gameLoop(), 150);

// 网格大小
this.gridSize = 20;

// 画布大小
this.canvas = document.getElementById('gameCanvas');
this.canvas.width = 400;
this.canvas.height = 400;
```

## 待改进点
//速度控制


享受游戏吧！