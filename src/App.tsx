import "./App.css";

import { PORT } from "../shared/constants";
import { NewAuthorForm } from "./inputforms/NewAuthorForm";
import { NewBookForm } from "./inputforms/NewBookForm";
import {
  getAllAuthors,
  getAuthor,
  searchAuthors,
} from "../shared/transformers";
import { ShowAuthors } from "./components/ShowThings";

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

const startingContent = await getAllAuthors();

const startingSearchContent = await searchAuthors("u");

const sampleSinglePieceOfContent = await getAuthor(4);

const App = () => {
  return (
    <>
      <div className="flex flex-row justify-center">
        <h3>Debug Tools</h3>
      </div>
      {ShowAuthors({ authors: startingContent })}
      <br />
      {ShowAuthors({ authors: [sampleSinglePieceOfContent] })}

      <br />
      <h1>Authors that have the letter U in their name: </h1>
      {ShowAuthors({ authors: startingSearchContent })}
      <br />
      <br />
      <div className="flex flex-row justify-center">
        <p className="bg-blue-100 text-red-500">Hello</p>
        <button onClick={() => getData()}>getData Button</button>
        <button onClick={() => getAllAuthors()}>getAuthors Button</button>
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
};

export default App;
