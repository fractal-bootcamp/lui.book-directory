import { Author, Book, Reader } from "@prisma/client";
import { PORT } from "./constants";

// To add in: Tag, Webuser

const serverPath = `http://localhost:${PORT}`;

//////////////////////////////////////////////////////////////////////////////
// READERS
//////////////////////////////////////////////////////////////////////////////

export const createOrUpdateReader = async (
  clerkID: string,
  firstName: string
) => {
  const response = await fetch(`${serverPath}/newuser`, {
    method: "POST",
    body: JSON.stringify({ clerkID, firstName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

export const getReaderIdFromClerkId = async (
  clerkid: string
): Promise<Reader> => {
  const data = await fetch(`${serverPath}/reader/id/${clerkid}`);
  const json = await data.json();
  return json.id.id;
};

export const readerBookFave = async (clerkUserId: string, bookId: string) => {
  const readerId = await getReaderIdFromClerkId(clerkUserId);
  const response = await fetch(`${serverPath}/fave`, {
    method: "POST",
    body: JSON.stringify({ readerId, bookId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

//////////////////////////////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////////////////////////////

export const getAuthor = async (id: number): Promise<Author> => {
  const data = await fetch(`${serverPath}/authors/id/${id}`);
  const json = await data.json();
  return json.authors;
};

export const getBook = async (id: number): Promise<Book> => {
  const data = await fetch(`${serverPath}/books/id/${id}`);
  const json = await data.json();
  return json.books;
};

export const getRandomAuthor = async (): Promise<Author> => {
  const allAuthors = await getAllAuthors();
  const id = allAuthors[0].id;
  const data = await fetch(`${serverPath}/authors/id/${id}`);
  const json = await data.json();
  return json.authors;
};

export const getRandomBook = async (): Promise<Book> => {
  const allBooks = await getAllBooks();
  const id = allBooks[0].id;
  const data = await fetch(`${serverPath}/books/id/${id}`);
  const json = await data.json();
  return json.books;
};

//////////////////////////////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////////////////////////////

export const getAllAuthors = async (): Promise<Author[]> => {
  const data = await fetch(`${serverPath}/authors`);
  const json = await data.json();
  console.log(json);
  return json.authors;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const data = await fetch(`${serverPath}/books`);
  const json = await data.json();
  console.log(json);
  return json.books;
};

//////////////////////////////////////////////////////////////////////////////
// GET SEARCH
//////////////////////////////////////////////////////////////////////////////

export const searchAuthors = async (query: string): Promise<Author[]> => {
  const data = await fetch(`${serverPath}/authors/search/${query}`);
  const json = await data.json();
  return json.authors;
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  const data = await fetch(`${serverPath}/books/search/${query}`);
  const json = await data.json();
  return json.books;
};
