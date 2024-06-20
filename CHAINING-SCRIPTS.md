### Problem:

You have a production flow that looks like this:

```
client App code -> Server.ts -> Prisma client -> Docker Database
```

But your QA/test flow needs to look like this:

```
client App code -> Server.ts -> Prisma client (using .env.test) -> Docker Database (using .env.test)
```

In order for this to work, you need to...

- Start Docker with a database
  - ...while referencing .env.test: Populate the database with basic tables (using prisma migrate)
    - ...while referencing the above: Start running Server.ts
      - ...while referencing the above: Run all your tests on client App code, which send calls across the whole flow
      - (Hopefully your tests all passed so you now just want to tidy up, so you...)
    - Switch off Server.ts
- Stop Docker

## Chaining together scripts as ingredients in package.json

You probably know:

- You can save a Terminal command in the scripts section of package.json as `"scriptname" : "your terminal script here"` and then run that script by just typing `npm run scriptname`. This a convenience, it's never strictly required.

You may not know:

- You can chain together scripts using the format `"script3": "script1 && script2"` and they will be run in sequence
- If you want the chain to continue even if a command fails, use a semicolon instead of &&, eg: `"script6":"script4; script5"`
- You can run a command with non-default .env variables by starting with the command with `npx dotenv-cli -e .env.test --`, where... `.env.test` is the home of the variables you want to use

This means we can combine our first few commands as follows:

```sh
docker compose -f docker-compose.test.yml up -d && npx dotenv-cli -e .env.test -- npx prisma migrate dev
```

and if we define "test:db:up" and "test:db:migrate" as ingredient scripts, we get the more manageable:

```sh
npm run test:db:up && npx dotenv-cli -e .env.test -- npm run test:db:migrate
```

## Problem - running Server.ts risks blocking the Terminal

Challenge: if we want to add `bun server/server.ts` to this chain brings to us a dead-end, because it's a command that typically takes over the Terminal. So we need it to run in a "detached" way, in the background. If we do this, we'll also need to be sure to switch it off afterwards.

### Solution: pm2 library

`npm install -g pm2` (the `-g` flag makes this global, not just for this project)

pm2 lets you run a command in a detached way using the syntax `pm2 start 'bun server/server.ts'`. You should name this process so it's easier to kill afterwards. This gives us:

`pm2 start 'bun server/server.ts' --name testserver`
and
`pm2 delete testserver`

## All together

The sequence for our scripts is going to be:

- START DOCKER/DB &&
  - TESTENV -- POPULATE DATABASE TABLES &&
    - TESTENV -- START SERVER &&
      - TESTENV -- RUN TESTS &&
    - STOP SERVER &&
- STOP DOCKER/DB

Instead of start/stop docker we say docker compose up/down. Instead of saying populate database we say prisma migrate. Etc etc. For that reason, the sequence above ends looking like the following in package.json:

```json
    "test:db:up": "docker compose -f docker-compose.test.yml up -d",
    "test:db:down": "docker compose -f docker-compose.test.yml down",
    "test:db:migrate": "npx prisma migrate dev",
    "test:server:up":"pm2 start 'bun server/server.ts' --name testserver",
    "test:server:down":"pm2 delete testserver",
    "test:db:run": "vitest run",
    "test-db": "npm run test:db:up && npx dotenv-cli -e .env.test -- npm run test:db:migrate && npx dotenv-cli -e .env.test -- npm run test:server:up && npx dotenv-cli -e .env.test -- npm run test:db:run; npm run test:server:down && npm run test:db:down"
```

This can called with `npm run test-db`.
