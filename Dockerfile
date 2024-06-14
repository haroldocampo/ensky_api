FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app .

CMD ["node", "./dist/app.js"]

EXPOSE 3000