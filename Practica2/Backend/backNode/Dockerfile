#instalo node para que corra react
FROM node:16.16.0

#defino mi espacio de trabajo
WORKDIR /practica2backNode

#copio los package para q se instale bien
COPY package*.json ./

#instalo las dependencias a travez de los package.json
RUN npm install

#copio todo pero el dockerignore tambien hace de las suyas
COPY . .

#DOCKER COMPOUSE --------------------
EXPOSE 7000

#corro el back-end    #npm run serve            
CMD ["node","index.js"]   