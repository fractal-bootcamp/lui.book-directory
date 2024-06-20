import { Author, Book } from "@prisma/client";

export const ShowAuthors = ({ items }: { items: Author[] }) => {
  console.log(items);
  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            {" "}
            {item.name} {item.genre}
          </div>
        );
      })}
    </div>
  );
};

export const ShowBooks = ({ items }: { items: Book[] }) => {
  return (
    <div>
      {items.map((item, index) => {
        return <div key={index}> {item.name}</div>;
      })}
    </div>
  );
};
