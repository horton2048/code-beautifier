#!/bin/bash
# 图标生成脚本

echo "🎨 生成CodeBeauty图标..."

# 使用ImageMagick生成图标（如果安装了）
if command -v convert &> /dev/null; then
  # 128x128 - 主图标
  convert -size 128x128 xc:none \
    -fill '#667eea' \
    -draw 'circle 64,64 64,0' \
    -pointsize 72 \
    -fill white \
    -gravity center \
    -annotate +0+0 '🎨' \
    icons/icon128.png

  # 48x48 - 工具栏图标
  convert icons/icon128.png -resize 48x48 icons/icon48.png

  # 16x16 - favicon
  convert icons/icon128.png -resize 16x16 icons/icon16.png

  echo "✅ 图标生成完成"
else
  echo "⚠️  ImageMagick未安装，使用占位图标"

  # 创建简单的PNG占位符
  # 实际部署时应该用专业工具设计

  # 方法1: 使用在线工具
  echo "请访问以下网站在线生成图标："
  echo "https://www.favicon-generator.org/"
  echo "https://realfavicongenerator.net/"

  # 方法2: 使用macOS的sips
  if command -v sips &> /dev/null; then
    echo "尝试使用macOS sips..."
    # 这里需要一个基础图片
  fi
fi

echo ""
echo "图标要求："
echo "- icon16.png: 16x16px"
echo "- icon48.png: 48x48px"
echo "- icon128.png: 128x128px"
echo ""
echo "建议使用专业工具设计："
echo "- Figma: https://www.figma.com/"
echo "- Canva: https://www.canva.com/"
echo "- Sketch: https://www.sketch.com/"