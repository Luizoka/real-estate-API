FROM node:23-slim

WORKDIR /usr/src/app

# Copie apenas o package.json e package-lock.json (se existir)
COPY package.json ./
COPY package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

EXPOSE 3000

# Garante que nodemon e ts-node estejam disponíveis (caso não estejam em dependencies)
RUN npm install -g ts-node nodemon

CMD ["npm", "run", "dev"]
