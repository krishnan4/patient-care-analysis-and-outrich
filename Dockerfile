# Frontend Dockerfile
FROM node:16

WORKDIR /app

COPY frontend/ .

RUN npm install

CMD ["npm", "start"]