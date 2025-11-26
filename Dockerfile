FROM node:24.0.2

WORKDIR /app

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm install

COPY . /app

CMD ["npm", "run", "start:dev"]