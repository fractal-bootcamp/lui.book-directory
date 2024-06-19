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

app.get("/authors", async (req, res) => {
  const authors = await prisma.author.findMany();
  console.log("/authors has received a request.");
  res.json({ authors });
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
