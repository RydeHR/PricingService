FROM node:carbon

WORKDIR C:/Users/Nick/thesis

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]