# Usa una imagen base oficial de Node.js para crear la imagen
FROM node:20 AS build

# Instalar la librería crypto
RUN apt-get update && apt-get install -y libssl-dev

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos de React desde el contenedor anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
