FROM node:16.14-alpine
WORKDIR /app-backend
COPY package.json .
COPY . .
EXPOSE 3001
RUN npm i
ENTRYPOINT [ "npm", "run", "dev" ]
