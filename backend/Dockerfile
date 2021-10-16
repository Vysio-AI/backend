FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*"]

RUN yarn install --production

COPY . .

COPY boot.sh .

RUN chmod +x boot.sh

EXPOSE 3000

CMD [ "sh", "./boot.sh" ]