import { Author, sampleAuthor, Book, Tag, Webuser, PORT } from "./constants";

const serverPath = `http://localhost:${PORT}`;

//////////////////////////////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////////////////////////////

export const getAuthor = async (id: number): Promise<Author> => {
  if (id === 999) {
    return sampleAuthor;
  }
  const data = await fetch(`${serverPath}/authors/id/${id}`);
  const json = await data.json();
  return json.authors;
};

export const getBook = async (id: number): Promise<Book> => {
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
