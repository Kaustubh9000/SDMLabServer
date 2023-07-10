FROM node
WORKDIR /home/node
COPY . .
CMD node index.js   