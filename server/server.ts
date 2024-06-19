import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { PORT } from "../shared/constants";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const books = "real data";
  res.json({ books: books });
});

//
// Hierarchy is always:
// 1 - Author
// 2 - Book
// 3 - Other
//

//////////////////////////////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////////////////////////////

app.get("/authors/id/:id", async (req, res) => {
  const { id } = req.params;
  const authors = await prisma.author.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log("Route called: /authors/search/:query");
  res.json({ authors });
});

//////////////////////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////////////////////

app.get("/authors", async (req, res) => {
  const authors = await prisma.author.findMany();
  console.log("/authors has received a request.");
  res.json({ authors });
});

//////////////////////////////////////////////////////////////////////////////
// GET SEARCH
//////////////////////////////////////////////////////////////////////////////

app.get("/authors/search/:query", async (req, res) => {
  const { query } = req.params;
  const authors = await prisma.author.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  console.log("Route called: /authors/search/:query");
  res.json({ authors });
});

//////////////////////////////////////////////////////////////////////////////
// ADD NEW
//////////////////////////////////////////////////////////////////////////////

app.post("/newauthor", async (req, res) => {
  try {
    const result = await prisma.author.create({
      data: {
        ...req.body,
      },
    });
    console.log(
      "SUCCESS: /newauthor endpoint was called and responded with",
      result
    );
    res.json(result);
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ error: "Failed to create author" });
  }
});

app.post("/newbook", async (req, res) => {
  try {
    const result = await prisma.book.create({
      data: {
        ...req.body,
      },
    });
    console.log(
      "SUCCESS: /newbook endpoint was called and responded with",
      result
    );
    res.json(result);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
});

//////////////////////////////////////////////////////////////////////////////
// MISC
//////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
