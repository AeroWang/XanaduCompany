FROM node:16

WORKDIR /app

COPY . .
RUN npm config set registry https://registry.npmmirror.com && npm install && npm install -g pm2

CMD ["bash", "run.sh"]
