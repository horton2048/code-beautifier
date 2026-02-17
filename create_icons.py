#!/usr/bin/env python3
"""
创建简单的PNG图标（使用PIL）
"""
try:
    from PIL import Image, ImageDraw, ImageFont
    import os

    # 创建icons目录
    os.makedirs('icons', exist_ok=True)

    # 创建不同尺寸的图标
    sizes = [(16, 16), (48, 48), (128, 128)]

    for size in sizes:
        # 创建图像
        img = Image.new('RGBA', size, (102, 126, 234, 255))  # 紫色背景
        draw = ImageDraw.Draw(img)

        # 绘制圆角矩形
        corner_radius = size[0] // 4
        draw.rounded_rectangle(
            [(0, 0), size],
            radius=corner_radius,
            fill=(102, 126, 234, 255),
            outline=(255, 255, 255, 255),
            width=2
        )

        # 绘制emoji（简化为文本）
        try:
            # 尝试使用系统字体
            font_size = size[0] // 2
            font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', font_size)
        except:
            # 使用默认字体
            font = ImageFont.load_default()

        # 绘制文本（简化版）
        text = 'CB'  # Code Beauty缩写
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]

        position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2)
        draw.text(position, text, fill='white', font=font)

        # 保存
        filename = f'icons/icon{size[0]}.png'
        img.save(filename)
        print(f'✅ 生成 {filename}')

    print('✅ 图标生成完成！')

except ImportError:
    print('❌ PIL未安装，请运行: pip3 install Pillow')
    print('或者手动创建图标文件:')
    print('  - icons/icon16.png (16x16px)')
    print('  - icons/icon48.png (48x48px)')
    print('  - icons/icon128.png (128x128px)')