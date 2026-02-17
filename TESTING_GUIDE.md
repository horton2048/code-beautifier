# CodeBeauty - 本地测试指南

## 📥 第一步：下载代码到您的电脑

### 方法1：使用SCP下载（推荐，最快）

**Windows用户**:
```bash
# 在PowerShell或CMD中运行
scp -r root@your-server-ip:/root/.openclaw/workspace/code-beautifier ./
```

**Mac/Linux用户**:
```bash
# 在终端中运行
scp -r root@your-server-ip:/root/.openclaw/workspace/code-beautifier ./
```

### 方法2：使用SFTP工具（可视化操作）

推荐工具：
- **WinSCP** (Windows): https://winscp.net/
- **FileZilla** (跨平台): https://filezilla-project.org/
- **Cyberduck** (Mac): https://cyberduck.io/

**操作步骤**:
1. 下载并安装上述任一工具
2. 连接到您的服务器（IP、用户名root、密码）
3. 导航到：`/root/.openclaw/workspace/code-beautifier`
4. 右键下载整个文件夹到本地

### 方法3：创建下载链接（最简单）

让我在服务器上创建一个压缩包，您直接下载：

```bash
# 在服务器上运行
cd /root/.openclaw/workspace
tar -czf code-beautifier.tar.gz code-beautifier/
```

然后通过浏览器下载：`http://your-server-ip:8000/code-beautifier.tar.gz`

---

## 🚀 第二步：在Chrome中加载扩展

### Windows/Mac/Linux 通用步骤

1. **打开Chrome浏览器**

2. **访问扩展管理页面**
   - 在地址栏输入：`chrome://extensions/`
   - 或者：菜单 → 更多工具 → 扩展程序

3. **开启开发者模式**
   - 找到右上角的"开发者模式"开关
   - 打开它

4. **加载扩展**
   - 点击左上角的"加载已解压的扩展程序"按钮
   - 选择您下载的 `code-beautifier` 文件夹
   - 点击"选择文件夹"

5. **确认安装**
   - 如果提示错误，检查manifest.json语法
   - 如果成功，会在扩展列表看到"CodeBeauty"

---

## 🧪 第三步：测试功能

### 测试步骤

1. **访问测试网站**
   - GitHub: https://github.com (查看README中的代码)
   - Stack Overflow: https://stackoverflow.com (查看代码回答)
   - 任何包含 `<pre>` 或 `<code>` 标签的网页

2. **使用扩展**
   - 点击Chrome工具栏中的CodeBeauty图标（紫色的"CB"圆圈）
   - 会弹出漂亮的紫色渐变窗口
   - 点击"美化所有代码"按钮

3. **观察效果**
   - 网页上的代码块应该立即美化
   - 语法高亮生效
   - 右上角出现复制/导出按钮

4. **测试功能**
   - ✅ 切换主题（Monokai, GitHub, Dracula, Nord）
   - ✅ 调整字号（12-18px）
   - ✅ 开关行号
   - ✅ 点击"复制"按钮
   - ✅ 点击"导出"按钮（保存为PNG）

---

## 🐛 常见问题排查

### 问题1：扩展加载失败
**原因**: manifest.json格式错误
**解决**: 确保下载的是完整文件夹，不是单个文件

### 问题2：点击按钮没反应
**原因**: Content Script未注入
**解决**:
- 刷新测试网页
- 检查浏览器控制台（F12）是否有错误

### 问题3：语法高亮不生效
**原因**: Prism.js未加载
**解决**: 确认 `lib/prism.js` 文件存在且可访问

### 问题4：导出功能失败
**原因**: html2canvas跨域问题
**解决**: 某些网站可能有安全限制，正常现象

---

## 📸 第四步：准备发布材料（可选）

如果测试效果满意，可以开始准备发布：

### 需要的材料

1. **图标优化**
   - 当前图标是自动生成的简单版本
   - 建议用Figma重新设计：https://www.figma.com/
   - 需要尺寸：16x16, 48x48, 128x128

2. **截图（3-5张）**
   - 打开测试网站
   - 使用扩展美化代码
   - 截图美化前后的对比
   - 展示不同主题效果

3. **演示视频（15-30秒）**
   - 使用Loom录制：https://www.loom.com/
   - 展示：点击 → 美化 → 完成

4. **商店描述**
   ```
   CodeBeauty - 一键美化网页代码块

   让AI生成的代码从"垃圾"变成"艺术品"

   ✨ 特性：
   • 一键美化所有代码块
   • 4种精美主题
   • 语法高亮
   • 行号显示
   • 一键复制
   • 导出PNG图片

   完美适用于：开发者、学生、AI用户

   🆓 免费使用，Pro版更多功能
   ```

5. **隐私政策页面**
   - 创建简单的GitHub Pages
   - 说明：不收集数据、纯本地运行

---

## 💰 第五步：发布到Chrome商店（$5费用）

1. **注册开发者账号**
   - 访问：https://chrome.google.com/webstore/devconsole
   - 支付$5一次性费用（Google账户）

2. **创建扩展项目**
   - 上传代码压缩包
   - 填写商店信息
   - 上传图标和截图
   - 提交审核

3. **等待审核**
   - 通常1-3天
   - 审核通过后自动上架

---

## 🎯 快速开始命令

让我帮您创建下载链接，您可以直接下载：

```bash
# 在服务器上运行（我帮您执行）
cd /root/.openclaw/workspace
tar -czf code-beautifier.tar.gz code-beautifier/
python3 -m http.server 8000
```

然后在浏览器访问：
```
http://your-server-ip:8000/code-beautifier.tar.gz
```

---

## 📞 需要帮助？

如果遇到问题，告诉我：
1. 您用什么操作系统？（Windows/Mac/Linux）
2. 您是否熟悉命令行？
3. 您更倾向于哪种下载方式？

我会根据您的情况提供详细指导！

---

**准备好了告诉我，我帮您创建下载链接！** 🚀
