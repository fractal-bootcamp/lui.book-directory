import { Author, sampleAuthor, Book, Tag, Webuser } from "./constants";

export const getAuthor = (id: number): Author => {
  if (id === 999) {
    return sampleAuthor;
  } else return sampleAuthor;
};
