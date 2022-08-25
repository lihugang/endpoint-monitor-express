# Endpoint Monitor For express
# 端点监控 Express版
### Version: 1.0.0
### 版本：1.0.0
### License: MIT License
### 协议：MIT
- - -
Dependencies: 依赖：  
- (endpoint-monitor)[https://www.npmjs.org/endpoint-monitor]: `^1.0.2` offer basic functions 提供基本功能
- cookie-parser: `^1.4.6` Cookie Parser Cookie解析 (Used for marking clients, 用于标记客户端)

How to use:
```javascript
const express = require('express');
const app = express();

const monitor = require('endpoint-monitor-express');

app.use(monitor());

...
```
