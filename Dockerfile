FROM node:4.2.0

WORKDIR /opt/code
EXPOSE 4040

COPY package.json ./
RUN npm install
COPY . .
RUN /opt/code/node_modules/.bin/grunt buildprod

CMD ["npm", "run", "start"]
