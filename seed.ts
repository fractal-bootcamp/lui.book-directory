import client from "./client";
import { searchAuthors } from "./shared/transformers";

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
        genre: "Dark Humor",
        nation: "United States",
      },
      {
        name: "Mary Beard",
        genre: "Classics Non-Fiction",
        nation: "United Kingdom",
      },
      {
        name: "James Joyce",
        genre: "Modernism",
        nation: "Ireland",
      },
      {
        name: "Charles Baudelaire",
        genre: "Poetry",
        nation: "France",
      },
      {
        name: "Italo Calvino",
        genre: "Realism",
        nation: "Italy",
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
      {
        authorId: sampleAuthorId,
        name: "Player Piano",
        language: "English",
      },
      {
        authorId: sampleAuthorId,
        name: "Mother Night",
        language: "English",
      },
      {
        authorId: sampleAuthorId,
        name: "Cat's Cradle",
        language: "English",
      },
      {
        authorId: sampleAuthorId,
        name: "Slapstick",
        language: "English",
      },
      {
        authorId: sampleAuthorId,
        name: "Jailbird",
        language: "English",
      },
      {
        authorId: sampleAuthorId,
        name: "Bluebeard",
        language: "English",
      },
    ],
  });
};

export default seed;
