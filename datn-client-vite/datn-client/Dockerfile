FROM node:18-alpine AS development
# Set working directory
WORKDIR /app
#
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# COPY yarn.lock /app/yarn.lock

# Same as npm install
RUN npm install -f
COPY . /app
ENV CI=true

FROM development AS build
RUN npm run build:prod

# 2. For Nginx setup
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Copy folder đã được build vào folder chạy của nginx.
COPY --from=build /app/dist/ /usr/share/nginx/html
# 
# Copy file cấu hình chạy cho nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
