FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Запускаем seed, затем сервер
CMD npm run seed && npm run dev-server