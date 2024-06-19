import { useState } from "react";
import { PORT } from "../../shared/constants";

const serverPath = `http://localhost:${PORT}`;

const newAuthorSubmit = async (name: string) => {
  try {
    const response = await fetch(`${serverPath}/newauthor`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("SUCCESS: newAuthorSubmit completed with", json);
    return json;
  } catch (error) {
    console.error("Error submitting new author:", error);
    throw error; // or handle the error appropriately
  }
};

export const NewAuthorForm = () => {
  const [submittedValue, setSubmittedValue] = useState("");

  return (
    <>
      <div>Enter an Author name here:</div>
      <input
        type="text"
        value={submittedValue}
        onChange={(e) => {
          setSubmittedValue(e.target.value);
        }}
      />
      <button type="submit" onClick={() => newAuthorSubmit(submittedValue)}>
        Submit
      </button>
    </>
  );
};
