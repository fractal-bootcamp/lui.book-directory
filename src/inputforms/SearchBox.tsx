import { useState } from "react";
import {
  getAllAuthors,
  getAllBooks,
  searchAuthors,
  searchBooks,
} from "../../shared/transformers";
import { flexColClass, flexRowClass } from "../App";

export const SearchBox = ({
  contentType,
  setValue,
}: {
  contentType: "Author" | "Book";
  setValue: Function;
}) => {
  const [submittedValue, setSubmittedValue] = useState("");

  const search = contentType === "Author" ? searchAuthors : searchBooks;

  const getAll = contentType === "Author" ? getAllAuthors : getAllBooks;

  const submitHandler = async (submittedValue: string) => {
    const searchResults = await search(submittedValue);
    setValue(searchResults);
  };

  const clearButtonHandler = async () => {
    setSubmittedValue("");
    const searchResults = await getAll();
    setValue(searchResults);
  };

  return (
    <>
      <div className={flexColClass}>
        <div className={flexRowClass}>Enter {contentType} name here:</div>
        <div className={flexRowClass}>
          <input
            type="text"
            value={submittedValue}
            className="flex bg-gray-100"
            onChange={(e) => {
              setSubmittedValue(e.target.value);
            }}
          />
        </div>
        <div className={flexRowClass}>
          <button type="submit" onClick={() => submitHandler(submittedValue)}>
            {contentType} Search
          </button>
        </div>
        <div className={flexRowClass}>
          <button type="submit" onClick={() => clearButtonHandler()}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
};
