import { useState } from "react";
import "./App.css";

import { PORT } from "../shared/constants";

const serverPath = `http://localhost:${PORT}`;

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
      <button onClick={() => getData()}>Test Button</button>
    </>
  );
}

export default App;
