import "./App.css";

import { NewAuthorForm } from "./inputforms/NewAuthorForm";
import { NewBookForm } from "./inputforms/NewBookForm";
import {
  createOrUpdateReader,
  getAllAuthors,
  getAllBooks,
} from "../shared/transformers";
import { ShowAuthors, ShowBooks } from "./components/ShowThings";
import { useEffect, useState } from "react";
import { SearchBox } from "./inputforms/SearchBox";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { ShowBookBadges } from "./components/Badge";

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

export const flexRowClass = "flex flex-row m-5 justify-center";

export const flexColClass = "flex flex-col m-5";

const App = () => {
  const [displayedAuthors, setDisplayedAuthors] = useState(startingAuthors);
  const [displayedBooks, setDisplayedBooks] = useState(startingBooks);
  const { isSignedIn, user } = useUser();
  console.log("USER", user);
  const [poller, setPoller] = useState(0); // Any time ANYTHING changes that you want to trigger some updates, setPoller with any new number

  // this useEffect fetches data whenever isSigned in or poller changes
  useEffect(() => {
    console.log("USER OBJECT IS", user);
    if (isSignedIn && user.id && user.firstName) {
      createOrUpdateReader(user.id, user.firstName);
      // async function setupMovies() {
      //   const favMovies = await getUserFavMovies(user!.id);
      //   setFavMovies(favMovies);
      // }
      // setupMovies();
      // getNonFavorites();
    }
  }, [isSignedIn, poller]);

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <button onClick={() => setPoller(poller + 1)}>Sync</button>
      <Divider text={"Search for your faves!"} color={"blue"} />
      <div className={flexRowClass}>
        <SearchBox contentType="Author" setValue={setDisplayedAuthors} />
        <SearchBox contentType="Book" setValue={setDisplayedBooks} />
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
      <Divider text="Alt view of available books" color="yellow" />

      <div className={flexRowClass}>
        <ShowBookBadges items={displayedBooks} />
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
