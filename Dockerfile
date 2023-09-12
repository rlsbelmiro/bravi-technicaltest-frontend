# Usando a imagem oficial do Node.js como imagem base
FROM node:alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiando os arquivos de configuração do aplicativo
COPY package*.json ./

# Instalando as dependências do Node.js
RUN npm install

# Copiando os arquivos do aplicativo para o contêiner
COPY . .

# Construindo o aplicativo Angular
RUN npm run build --prod

# Configurando variável de ambiente para produção
ENV NODE_ENV=production

# Expondo a porta na qual o aplicativo Angular será executado
EXPOSE 8080

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["node", "server.js"]