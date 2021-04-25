#installerer alpine linux (liten og lettt linux variant, førere til mindre "Image size")
FROM node:10.20.1-alpine3.10

# stter working directory til /app
WORKDIR '/app'

#copierer ./package.json  til /app
COPY package.json .

#instalerer packages specifisert i ./package.json 
RUN npm install
COPY . .

#kjører npm start kommando, spesifisert i package.json til nodemon app.js
CMD ["npm","start"]
