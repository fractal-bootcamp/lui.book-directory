import { ContentType, Author } from "../../shared/constants";

export const ShowThing = ({ id, type }: { id: number; type: ContentType }) => {
  return (
    <div>
      The id is {id}. The type is {type}.
    </div>
  );
};

export const ShowAuthors = ({ authors }: { authors: Author[] }) => {
  return (
    <div>
      {authors.map((author, index) => {
        return <div key={index}> {author.name}</div>;
      })}
    </div>
  );
};
