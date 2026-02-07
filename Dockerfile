FROM node:20-alpine

WORKDIR /app

COPY Asset-Manager/package*.json ./

RUN npm install

COPY Asset-Manager/ .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "run", "start"]
