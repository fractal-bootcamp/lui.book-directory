import client from "./client";
import { getRandomAuthor } from "./shared/transformers";

const seed = async () => {
  await client.book.deleteMany({
    where: {},
  });

  await client.author.deleteMany({
    where: {},
  });

  const authors = await client.author.createMany({
    data: [
      {
        name: "Kurt Blogs",
      },
      {
        name: "Mary Peary",
      },
    ],
  });

  const sampleAuthorId = (await getRandomAuthor()).id;

  const books = await client.book.createMany({
    data: [
      {
        authorId: sampleAuthorId,
        name: "Book 1",
      },
      {
        authorId: sampleAuthorId,
        name: "Atlas Book 2",
      },
    ],
  });
};

export default seed;
