FROM node:10

RUN npm install webpack -g

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /usr/src/app/


RUN npm install
RUN npm rebuild node-sass
RUN npm run build
# If you are building your code for production
# RUN npm install --only=production

# # Bundle app source
# COPY . .

CMD [ "npm", "start"]