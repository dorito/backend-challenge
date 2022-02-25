FROM node:latest
WORKDIR /app
COPY package.json /app/package.json
COPY ./ /app/
RUN yarn install
RUN yarn run build

CMD ['yarn', 'start']