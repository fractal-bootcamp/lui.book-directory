import { Author, sampleAuthor, Book, Tag, Webuser } from "./constants";
import {
  getAllAuthors,
  getAllBooks,
  getAuthor,
  getBook,
  searchAuthors,
  searchBooks,
} from "./transformers";
import { test, describe, it, expect } from "vitest";

//////////////////////////////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////////////////////////////

describe(getAuthor, () => {
  it("gets an Author object with the id", async () => {
    const author = await getAuthor(999);
    expect(author).toEqual(sampleAuthor);
  });
});

describe(getBook, () => {
  it("gets a Book object with the id", async () => {
    const author = await getBook(1);
    expect(author).toBeTruthy();
  });
});

//////////////////////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////////////////////

describe(getAllAuthors, () => {
  it("gets all Author objects", async () => {
    const authors = await getAllAuthors();
    expect(authors).toBeTruthy();
  });
});

describe(getAllBooks, () => {
  it("gets all Book objects", async () => {
    const authors = await getAllBooks();
    expect(authors).toBeTruthy();
  });
});

//////////////////////////////////////////////////////////////////////////////
// GET SEARCH
//////////////////////////////////////////////////////////////////////////////

describe(searchAuthors, () => {
  it("searches across all Author objects", async () => {
    const authors = await searchAuthors("Kurt");
    expect(authors).toBeTruthy();
  });
});

describe(searchBooks, () => {
  it("searches across all Book objects", async () => {
    const authors = await searchBooks("Atlas");
    expect(authors).toBeTruthy();
  });
});
