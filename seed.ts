import client from "./client";
import { getRandomAuthor, searchAuthors } from "./shared/transformers";

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
        name: "Kurt Vonnegut",
      },
      {
        name: "Mary Beard",
      },
    ],
  });

  const sampleAuthorId = (await searchAuthors("Kurt Vonnegut"))[0].id;

  const books = await client.book.createMany({
    data: [
      {
        authorId: sampleAuthorId,
        name: "Hocus Pocus",
        language: "English",
      },
      {
        authorId: sampleAuthorId,
        name: "Timequake",
        language: "English",
      },
    ],
  });
};

export default seed;
