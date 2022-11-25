FROM node:16.17.1-alpine3.15

WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]