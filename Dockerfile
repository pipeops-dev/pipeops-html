# build stage
FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
ARG PORT
ENV PORT=$PORT

WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .

# Create an template of Nginx configuration file that uses PORT 
RUN echo "server { listen \$PORT default_server; root /usr/share/nginx/html; }" > /etc/nginx/conf.d/default.conf.template

EXPOSE $PORT

# At container startup, replace the $PORT in the configuration file with the current PORT then start Nginx
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'