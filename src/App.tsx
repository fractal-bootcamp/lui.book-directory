import "./App.css";

import { NewAuthorForm } from "./inputforms/NewAuthorForm";
import { NewBookForm } from "./inputforms/NewBookForm";
import { getAllAuthors, getAllBooks } from "../shared/transformers";
import { ShowAuthors, ShowBooks } from "./components/ShowThings";
import { useState } from "react";

const startingAuthors = await getAllAuthors();

const startingBooks = await getAllBooks();

const Divider = ({ text, color }: { text: string; color: string }) => {
  console.log(
    `flex flex-row justify-center bg-${color}-100 text-${color}-500 m-8 p-2 rounded`
  );
  return (
    <div
      className={`flex flex-row justify-center bg-${color}-100 text-${color}-500 m-8 p-2 rounded`}
    >
      <h3>{text}</h3>
    </div>
  );
};

const flexRowClass = "flex flex-row m-5 justify-center";

const flexColClass = "flex flex-col m-5";

const App = () => {
  const [displayedAuthors, setDisplayedAuthors] = useState(startingAuthors);
  const [displayedBooks, setDisplayedBooks] = useState(startingBooks);

  return (
    <>
      <Divider text={"Search for your faves!"} color={"blue"} />
      <div className={flexRowClass}>
        <div className={flexColClass}>Search Input A will go here</div>
        <div className={flexColClass}>Search Input B will go here</div>
      </div>
      <br />
      <div className={flexRowClass}>
        <button onClick={() => getAllAuthors()}>Author Search</button>
        <button onClick={() => console.log("Hello World")}>Book Search</button>
      </div>

      <Divider text="Explore the library" color="green" />

      <div className={flexRowClass}>
        <div className={flexColClass}>
          {ShowAuthors({ items: displayedAuthors })}
        </div>
        <div className={flexColClass}>
          {ShowBooks({ items: displayedBooks })}
        </div>
      </div>
      <div className="flex flex-col">
        <Divider text="Add new entries - Mods only" color="red" />

        <div className={flexRowClass}>
          <div className={flexColClass}>
            <NewAuthorForm />
          </div>
          <div className={flexColClass}>
            <NewBookForm />
          </div>
        </div>
      </div>
      <p className="bg-blue-100 text-blue-500">Hello</p>
      <p className="bg-green-100 text-green-500">Hello</p>
      <p className="bg-red-100 text-red-500">Hello</p>
    </>
  );
};

export default App;
