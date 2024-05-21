FROM nginx:latest

ARG APP_PATH="dist" 
COPY ${APP_PATH} /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/
EXPOSE 80