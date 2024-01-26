FROM node:18-alpine

# Set the timezone to Asia/Singapore
RUN apk --no-cache add tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Singapore /etc/localtime \
    && echo "Asia/Singapore" > /etc/timezone

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
