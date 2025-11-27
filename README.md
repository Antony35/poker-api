<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Required
- pnpm https://pnpm.io/installation
- docker https://docs.docker.com/engine/install/
- docker-compose https://docs.docker.com/compose/install/

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

clone the depot with ssh

```bash
git clone https://github.com/Antony35/poker-api.git .
```

or with https
```bash
git clone git@github.com:Antony35/poker-api.git .
```

```bash
$ pnpm install
$ docker compose up -d
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Route list
### GET
    -   /tables
    -   /auth/profile

### POST
    -   /register { username: string, password: string }
    -   /auth/login { username: string, password: string }

### PUT
    -   /table/joint/:name (noobs, rookies, masters)

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Stay in touch

- Author - [Antony Huart](https://github.com/Antony35)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
