export const PORT = 4050;

export type Author = {
  id: number;
  name: string;
};

export const sampleAuthor = {
  id: 999,
  name: "John Doe",
};

export type Book = {
  id: number;
  title: string;
  authorId: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type Webuser = {
  id: number;
  name: string;
  avatarUrl?: string;
};

export type ContentType = "author" | "book";
