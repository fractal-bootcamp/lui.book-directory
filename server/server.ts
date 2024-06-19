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
