FROM node:24.0.2

WORKDIR /app

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm install

COPY . /app

# RUN npx prisma generate

RUN pnpm run build

CMD ["npm", "run", "start:dev"]