import client from "../client";
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

//
// Hierarchy is always:
// 0 - Reader (web user)
// 1 - Author
// 2 - Book
// 3 - Other
//

//////////////////////////////////////////////////////////////////////////////
// READERS
//////////////////////////////////////////////////////////////////////////////

app.post("/newuser", async (req, res) => {
  const reqClerkID = req.body.clerkID;
  const reqFirstName = req.body.firstName;
  console.log(reqClerkID);

  const user = await client.reader.upsert({
    where: { clerkID: reqClerkID },
    update: { clerkID: reqClerkID, name: reqFirstName },
    create: { clerkID: reqClerkID, name: reqFirstName },
  });

  res.json(user);
});

app.get("/reader/id/:clerkid", async (req, res) => {
  const { clerkid } = req.params;
  const entry = await client.reader.findUnique({
    where: {
      clerkID: clerkid,
    },
  });
  const id = entry ? entry.id : 0;
  console.log("Route called: /reader/id/:clerkid");
  res.json({ id });
});

// THURSDAY 20 JUN WRAPPING UP MID STREAM - THIS FUNCTION NEEDS WORK
// CALLED BY readerBookFave
//
// app.post("/fave", async (req, res) => {
//   const reqReaderId = req.body.readerId;
//   const reqBookId = req.body.bookId;

//   const newfave = await client.readerBookFave.upsert({
//     where: { bookId: reqBookId, readerId: reqReaderId },
//     update: { bookId: reqBookId, readerId: reqReaderId },
//     create: { bookId: reqBookId, readerId: reqReaderId },
//   });

//   res.json(newfave);
// });

//////////////////////////////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////////////////////////////

app.get("/authors/id/:id", async (req, res) => {
  const { id } = req.params;
  const authors = await client.author.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log("Route called: /authors/id/:id");
  res.json({ authors });
});

app.get("/books/id/:id", async (req, res) => {
  const { id } = req.params;
  const books = await client.book.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log("Route called: /books/id/:id");
  res.json({ books });
});

//////////////////////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////////////////////

app.get("/authors", async (req, res) => {
  const limitParam = req.query.limit;
  const limit = typeof limitParam === "string" ? parseInt(limitParam) : 10;
  const authors = await client.author.findMany({
    take: limit,
  });
  console.log("/authors has received a request.");
  res.json({ authors });
});

app.get("/books", async (req, res) => {
  const books = await client.book.findMany();
  console.log("/books has received a request.");
  res.json({ books });
});

//////////////////////////////////////////////////////////////////////////////
// GET SEARCH
//////////////////////////////////////////////////////////////////////////////

app.get("/authors/search/:query", async (req, res) => {
  const { query } = req.params;
  const authors = await client.author.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  console.log("Route called: /authors/search/:query");
  res.json({ authors });
});

app.get("/books/search/:query", async (req, res) => {
  const { query } = req.params;
  const books = await client.book.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  console.log("Route called: /books/search/:query");
  res.json({ books });
});

//////////////////////////////////////////////////////////////////////////////
// ADD NEW
//////////////////////////////////////////////////////////////////////////////

app.post("/newauthor", async (req, res) => {
  try {
    const result = await client.author.create({
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
    const result = await client.book.create({
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
