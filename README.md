# Wordfolio 2026 新春实验室

一个基于 React + TypeScript + Tailwind CSS 的趣味心理测试应用。

## 🚀 Zeabur Docker 部署

### 快速部署（推荐）

```bash
./deploy.sh
```

然后访问 [zeabur.com](https://zeabur.com) 上传生成的 `zeabur-deploy.zip`

### 手动部署

1. 清理并构建
```bash
rm -rf node_modules dist
npm install
npm run build
```

2. 压缩项目（不含 node_modules）
```bash
zip -r zeabur-deploy.zip . -x "node_modules/*" ".git/*" "dist/*"
```

3. 在 Zeabur 控制台上传 ZIP 文件

### GitHub 自动部署

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wordfolio.git
git push -u origin main
```

然后在 Zeabur 选择 "Deploy from GitHub"

## 🛠️ 技术栈

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 3.4
- React Router DOM 7
- html2canvas

## 📁 项目结构

```
src/
├── pages/          # 页面组件
│   ├── Home.tsx
│   └── test/       # 测试相关页面
├── sections/       # 首页区块
├── components/ui/  # UI 组件
└── App.tsx
```

## 📝 License

MIT
