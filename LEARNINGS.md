Problem:

You have a production flow that looks like this:

client App code -> Server.ts -> Prisma client -> Docker Database

Your QA/test flow is:

client App code -> Server.ts -> Prisma client (using .env.test) -> Docker Database (using .env.test)

In order for this to work, you need to...

- Start Docker with a database
  - [while referencing .env.test...]
  - Populate the database with basic tables (using prisma migrate)
    - [while referencing the instance of Prisma using .env.test]
    - Start running Server.ts
      - Run all your tests on client App code, which send calls across the whole flow
    - Switch off Server.ts
- Close Docker

## Running Server.ts without blocking the Terminal

Challenge: when we run `bun server/server.ts` it takes over the Terminal. So we need it to run in a "detached" way, in the background. If we do this, we'll also need to be sure to switch it off afterwards.

Solution:

`npm install -g pm2` (the `-g` flag makes this global, not just for this project)

pm2 lets you run a command in a detached way using the syntax `pm2 start 'bun server/server.ts'`. You should name this process so it's easier to kill afterwards. This gives us:

`pm2 start 'bun server/server.ts' --name testserver`
and
`pm2 delete testserver`

## Running Server.ts without blocking the Terminal

We can add these in as ingredient scripts to our

## Chaining together scripts as ingredients in package.json

You probably know:

- You can save a Terminal command in the scripts section of package.json as `"scriptname" : "your terminal script here"` and then run that script by just typing `npm run scriptname`. This a convenience, it's never strictly required.

You may not know:

- You can chain together scripts using the format `"script3": "script1 && script2"` and they will be run in sequence
- You can run a command with non-default .env variables by starting with the command with `npx dotenv-cli -e .env.test --`, where... `.env.test` is the home of the variables you want to use

The sequence for our scripts is going to be:

- START DOCKER/DB &&
  - TESTENV -- POPULATE DATABASE TABLES &&
    - TESTENV -- START SERVER &&
      - TESTENV -- RUN TESTS &&
    - STOP SERVER &&
- STOP DOCKER/DB

Instead of start/stop docker we say docker compose up/down. Instead of saying populate database we say prisma migrate. Etc etc. For that reason, the sequence above ends looking like the following in package.json:

```js
    "test:db:up": "docker compose -f docker-compose.test.yml up -d",
    "test:db:down": "docker compose -f docker-compose.test.yml down",
    "test:db:migrate": "npx prisma migrate dev",
    "test:server:up":"pm2 start 'bun server/server.ts' --name testserver",
    "test:server:down":"pm2 delete testserver",
    "test:db:run": "vitest run",
    "test-db": "npm run test:db:up && npx dotenv-cli -e .env.test -- npm run test:db:migrate && npx dotenv-cli -e .env.test -- npm run test:server:up && npx dotenv-cli -e .env.test -- npm run test:db:run && npm run test:server:down && npm run test:db:down"
```

This can called with `npm run test-db`.
