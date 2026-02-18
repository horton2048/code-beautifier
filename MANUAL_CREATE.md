# 📥 CodeBeauty 手动创建指南

由于服务器无法访问GitHub，我将把所有文件内容提供给您，您在本地手动创建。

---

## 📁 文件结构

```
code-beautifier/
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/
│   ├── content.js
│   └── content.css
├── background/
│   └── background.js
├── lib/
│   ├── prism.js (下载)
│   └── html2canvas.js (下载)
└── icons/
    ├── icon16.png (生成)
    ├── icon48.png (生成)
    └── icon128.png (生成)
```

---

## 📝 文件内容

### 1. manifest.json
```json
{
  "manifest_version": 3,
  "name": "CodeBeauty - 代码美化器",
  "version": "1.0.0",
  "description": "一键美化网页上的代码块，让代码更易读、更美观",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png"
    }
  },
  "permissions": [
    "activeTab",
    "scripting",
    "storage"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["lib/prism.js", "content/content.js"],
      "css": ["content/content.css"],
      "run_at": "document_end"
    }
  ],
  "background": {
    "service_worker": "background/background.js"
  },
  "host_permissions": [
    "https://*/*"
  ]
}
```

### 2. popup/popup.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeBeauty - 代码美化器</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎨 CodeBeauty</h1>
      <p class="subtitle">一键美化代码块</p>
    </div>

    <div class="actions">
      <button id="beautifyAll" class="btn btn-primary">
        <span class="icon">✨</span>
        美化所有代码
      </button>
      <button id="exportCurrent" class="btn btn-secondary">
        <span class="icon">📸</span>
        导出当前
      </button>
    </div>

    <div class="settings">
      <div class="setting-row">
        <label>主题</label>
        <select id="themeSelect">
          <option value="monokai">Monokai</option>
          <option value="github">GitHub Light</option>
          <option value="dracula">Dracula</option>
          <option value="nord">Nord</option>
        </select>
      </div>
      <div class="setting-row">
        <label>字号</label>
        <select id="fontSizeSelect">
          <option value="12">12px</option>
          <option value="14" selected>14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
        </select>
      </div>
      <div class="setting-row">
        <label>行号</label>
        <input type="checkbox" id="lineNumbers" checked>
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-value" id="codeBlockCount">0</span>
        <span class="stat-label">代码块</span>
      </div>
      <div class="stat-item">
        <span class="stat-value" id="beautifiedCount">0</span>
        <span class="stat-label">已美化</span>
      </div>
    </div>

    <div class="pro-cta">
      <p>⭐ 解锁20+高级主题和批量导出</p>
      <button class="btn btn-pro" id="upgradeBtn">
        升级到Pro - $5/月
      </button>
    </div>

    <div class="footer">
      <a href="#" id="helpBtn">帮助</a>
      <a href="#" id="feedbackBtn">反馈</a>
    </div>
  </div>

  <script src="popup.js"></script>
</body>
</html>
```

### 3. popup/popup.css
见飞书发送（文件太长，会分多条）

### 4. popup/popup.js
见飞书发送

### 5. content/content.js
见飞书发送

### 6. content/content.css
见飞书发送

### 7. background/background.js
见飞书发送

---

## 🔧 第三方库下载

### Prism.js（语法高亮）
访问：https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js
另存为：lib/prism.js

### html2canvas.js（导出图片）
访问：https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
另存为：lib/html2canvas.js

---

## 🎨 图标生成

### 方法1：在线生成
访问：https://www.favicon-generator.org/
上传图片或输入文字，生成不同尺寸的图标

### 方法2：使用Python（如果您有Python环境）
创建 generate_icons.py：
```python
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('icons', exist_ok=True)

sizes = [(16, 16), (48, 48), (128, 128)]
for size in sizes:
    img = Image.new('RGBA', size, (102, 126, 234, 255))
    draw = ImageDraw.Draw(img)
    corner_radius = size[0] // 4
    draw.rounded_rectangle(
        [(0, 0), size],
        radius=corner_radius,
        fill=(102, 126, 234, 255),
        outline=(255, 255, 255, 255),
        width=2
    )
    try:
        font_size = size[0] // 2
        font = ImageFont.truetype('arial.ttf', font_size)
    except:
        font = ImageFont.load_default()

    text = 'CB'
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2)
    draw.text(position, text, fill='white', font=font)

    img.save(f'icons/icon{size[0]}.png')
    print(f'✅ 生成 icons/icon{size[0]}.png')
```

运行：python generate_icons.py

### 方法3：使用简单图片
创建3个纯色PNG图片：
- icon16.png: 16x16px，紫色背景(#667eea)
- icon48.png: 48x48px，紫色背景(#667eea)
- icon128.png: 128x128px，紫色背景(#667eea)

---

## 🚀 创建步骤

### 第1步：创建文件夹
在您电脑上创建：
```
C:\Users\19723\code-beautifier\
```

### 第2步：创建子文件夹
```
mkdir popup
mkdir content
mkdir background
mkdir lib
mkdir icons
```

### 第3步：创建文件
按照上面的内容，逐个创建文件

### 第4步：下载第三方库
将下载的 prism.js 和 html2canvas.js 放入 lib 文件夹

### 第5步：生成图标
使用上面任一方法生成3个图标文件

---

## ✅ 验证

确保最终结构是：
```
code-beautifier/
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/
│   ├── content.js
│   └── content.css
├── background/
│   └── background.js
├── lib/
│   ├── prism.js
│   └── html2canvas.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

**准备好了告诉我，我会把剩余的文件内容通过飞书发送给您！**