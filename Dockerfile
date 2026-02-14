# 使用 Node.js 构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建项目
RUN npm run build

# 使用 Nginx 作为生产服务器
FROM nginx:alpine

# 删除默认配置
RUN rm -f /etc/nginx/conf.d/default.conf

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建结果到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 8080

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
