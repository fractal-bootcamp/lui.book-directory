import { useState } from "react";
import { PORT } from "../../shared/constants";

const serverPath = `http://localhost:${PORT}`;

const newBookSubmit = async (title: string, authorId: number) => {
  console.log("CALLED");
  try {
    const response = await fetch(`${serverPath}/newbook`, {
      method: "POST",
      body: JSON.stringify({ title, authorId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("SUCCESS: newBookSubmit completed with", json);
    return json;
  } catch (error) {
    console.error("Error submitting new book:", error);
    throw error; // or handle the error appropriately
  }
};

export const NewBookForm = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [authorId, setAuthorId] = useState("");

  return (
    <>
      <div>Enter book name here:</div>
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => {
          setBookTitle(e.target.value);
        }}
      />
      <div>Enter authorId here:</div>
      <input
        type="number"
        value={authorId}
        onChange={(e) => {
          setAuthorId(e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={() => newBookSubmit(bookTitle, parseInt(authorId))}
      >
        Submit
      </button>
    </>
  );
};
