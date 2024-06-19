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
      <div className="flex flex-row justify-center">
        <h3>Debug Tools</h3>
      </div>
      <div className="flex flex-row justify-center">
        <p className="bg-blue-100 text-red-500">Hello</p>
        <button onClick={() => getData()}>getData Button</button>
        <button onClick={() => getAuthors()}>getAuthors Button</button>
        <button onClick={() => console.log("Hello World")}>Test Button</button>
      </div>
      <div className="flex flex-row justify-center">
        <h3>Add in new data here</h3>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col m-10">
          <NewAuthorForm />
        </div>
        <div className="flex flex-col m-10">
          <NewBookForm />
        </div>
      </div>
    </>
  );
}

export default App;
