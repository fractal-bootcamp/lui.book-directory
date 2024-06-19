import { useState } from "react";
import "./App.css";

import { PORT } from "../shared/constants";
import { NewAuthorForm } from "./forms/NewAuthorForm";
import { NewBookForm } from "./forms/NewBookForm";

const serverPath = `http://localhost:${PORT}`;

const getAuthors = async () => {
  const data = await fetch(`${serverPath}/authors`);
  const json = await data.json();
  return json.authors;
};

const getData = async () => {
  const response = await fetch(`${serverPath}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("getGame json", json.books);
  return json.books;
};

function App() {
  return (
    <>
      <h2 className="bg-blue-100 text-red-500">Hello</h2>
      <button onClick={() => getData()}>getData Button</button>
      <button onClick={() => getAuthors()}>getAuthors Button</button>
      <button onClick={() => console.log("Hello World")}>Test Button</button>

      <NewAuthorForm />

      <NewBookForm />
    </>
  );
}

export default App;
