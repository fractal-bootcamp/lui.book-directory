import { Author, sampleAuthor, Book, Tag, Webuser } from "./constants";
import { getAuthor } from "./transformers";
import { test, describe, it, expect } from "vitest";

test("gets an Author object with the id", () => {
  expect(getAuthor(999)).toBe(sampleAuthor);
});
