FROM node:alpine

WORKDIR /app

COPY . .

ENV API_URL=http://localhost:8080/api
RUN npm install

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]