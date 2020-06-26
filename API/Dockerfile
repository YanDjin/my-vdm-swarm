FROM node:12-buster-slim

WORKDIR /app

RUN npm install

COPY . ./

EXPOSE 3001

CMD ["npm", "run", "dev"]