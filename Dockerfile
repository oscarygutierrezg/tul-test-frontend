FROM nginx:alpine
COPY /dist/ecommerce /usr/share/nginx/html
EXPOSE 80