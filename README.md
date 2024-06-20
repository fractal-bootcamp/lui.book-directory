# Runbook for how I started off with this app

- npx create-vite book-directory; then choose React; Typescript with SWC
  - `cd book-directory`
  - `npm install`
- Open in VS Code, initialize repository, create repo on github, then...
  - `git remote add origin https://github.com/fractal-bootcamp/lui.book-directory.git`
  - `git branch -M main`
  - `git push -u origin main`
- Add basics for a new server

  - `mkdir server`
  - `cd server`
  - `npm init`

  ```
    "name": "backend",
    "version": <just hit enter>
    "description": <just hit enter>
    "main": <just hit enter>
    test command: <just hit enter>
    git repository: <just hit enter>
    keywords: <just hit enter>
    "author": Lui
    "license": "MIT"
  ```

- In the /server folder:
  - `npm install express`
  - `npm i --save-dev @types/express`
  - `npm install cors`
  - `npm i --save-dev @types/cors`
- Create a server/server.ts file with the following:

import express from "express";
import cors from "cors";
import { PORT } from "../shared/constants";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
const books = "real data";
res.json({ books: books });
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

bun --watch server/server.ts
Add a shared folder
shared/constants.ts
Move PORT variable to here
Add some types that will be useful
Open up App.tsx and delete the junk, replace with:

import { PORT } from "../shared/constants";

const serverPath = `http://localhost:${PORT}`;

const getData = async () => {
const response = await fetch(`${serverPath}`, {
method: "GET",
headers: {
"Content-Type": "application/json",
},
});
const json = await response.json();
console.log("getGame json", json.books);
return json.books;
};

... and then in the jsx return value:

<button onClick={() => getData()}>Test Button</button>

Add a database
git checkout -b database-setup
Paste in docker-compose.yml from a previous project (example) and update it
(Ensure docker is running locally)
docker compose up
Check the database is live
psql postgresql://dbuser:dbpassword1@localhost:10099
SELECT \* FROM [shift shift] will list out available tables
npm install prisma --save-dev
npx prisma
this adds the Prisma CLI as a development dependency to your project, and lets you invoke Prisma CLI
npx prisma init
this sets up your Prisma ORM project by creating your Prisma schema file template
Open up the schema.prisma file. In this case:
model User {
id Int @id @default(autoincrement())
username String @unique
createdAt DateTime @default(now())
updatedAt DateTime? @updatedAt
@@map("user")
}
Update .env file to have the correct port and address, ie
DATABASE_URL="postgresql://dbuser:dbpassword1@localhost:10099/postgres"
npx prisma migrate dev
docker compose up
psql postgresql://dbuser:dbpassword1@localhost:10099/postgres
(this has been a little clunky - make sure to save everything - maybe migration half a minute to complete - and if it's acting up you can also docker compose down followed by docker compose up)
Add in one-to-many fields, eg...
in section for model Book:
authorId Int
author Author @relation(fields:[authorId], references: [id])
in the section for model Author
books Book[]
Add in the many-to-many fields, sticking to implicit method for now eg...
Tag
books Book[]
Book
tags Tag[]
Connect a simple GET endpoint to call the Prisma database:
Some dummy date here will be handy...
INSERT INTO author (name) VALUES ('James Joyce');
In server.ts, add in an endpoint (great Prisma documentation here)...

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
app.get("/authors", async (req, res) => {
const authors = await prisma.author.findMany();
res.json({authors});
});

In App.tsx call this endpoint...

const getAuthors = async () => {
const data = await fetch(`${serverPath}/authors`);
const json = await data.json();
return json.authors;
};

Add a simple POST endpoint to add entries into Prisma. Very similar to GET except the function calling it will include some more request details, e.g for an endpoint expecting { "name" : "James Joyce" } as the body, we have....

    const response = await fetch(`${serverPath}/newauthor`, {

method: "POST",
body: JSON.stringify({ name }),
headers: {
"Content-Type": "application/json",
},
});

Add Tailwind
npm install -D tailwindcss
-D is a shorthand for --save-dev. It indicates that the package should be installed as a development dependency. Development dependencies are packages that are only needed during the development process and not in the production environment. These are listed in the devDependencies section of your package.json file.
npx tailwindcss init --ts
add in to tailwind.config.ts: content: ["./src/**/*.{js,jsx,ts,tsx}",],
add in to index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;
This was messy today for some reason. I ended up having to also run this command:
npm install -D tailwindcss postcss autoprefixer
and then updating vite.config.ts to look like this:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
plugins: [react()],
css: {
postcss: {
plugins: [tailwindcss(), autoprefixer()],
},
},
});

Add in https://vitest.dev/
npm install -D vitest
Create blah.test.ts file in order to test functions in blah.ts
Top of test file needs:
import { test, expect } from "vitest";
Add in to package.json scripts list...
"scripts": {"test": "vitest" }
npm run test

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
