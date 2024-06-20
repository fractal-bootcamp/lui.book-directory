import { Author, sampleAuthor, Book, Tag, Webuser } from "./constants";
import {
  getAllAuthors,
  getAllBooks,
  getAuthor,
  getBook,
  getRandomAuthor,
  getRandomBook,
  searchAuthors,
  searchBooks,
} from "./transformers";
import { test, describe, it, expect, beforeEach, beforeAll } from "vitest";

import seed from "../seed";

beforeAll(async () => {
  await seed();
});

//////////////////////////////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////////////////////////////

describe("check you can get an Author object", () => {
  it("gets an Author object with the id", async () => {
    const randomAuthor = await getRandomAuthor();
    const author = await getAuthor(randomAuthor.id);
    expect(author).toBeTruthy();
  });
});

describe("check you can get a Book object", () => {
  it("gets a Book object with the id", async () => {
    const randomBook = await getRandomBook();
    const book = await getBook(randomBook.id);
    expect(book).toBeTruthy();
  });
});

//////////////////////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////////////////////

describe(getAllAuthors, () => {
  it("gets all Author objects", async () => {
    const authors = await getAllAuthors();
    console.log("AUTHORS IN TEST", authors);
    expect(authors.length).toBeGreaterThan(1);
  });
});

describe(getAllBooks, () => {
  it("gets all Book objects", async () => {
    const books = await getAllBooks();
    console.log("BOOKS IN TEST", books);
    expect(books.length).toBeGreaterThan(1);
  });
});

//////////////////////////////////////////////////////////////////////////////
// GET SEARCH
//////////////////////////////////////////////////////////////////////////////

describe(searchAuthors, () => {
  it("searches across all Author objects", async () => {
    const authors = await searchAuthors("Kurt");
    expect(authors).toBeTruthy();
    expect(authors.length).toBeGreaterThan(1);
  });
});

describe(searchBooks, () => {
  it("searches across all Book objects", async () => {
    const books = await searchBooks("Piano");
    expect(books.length).toBeGreaterThan(1);
    expect(books).toBeTruthy();
  });
});
