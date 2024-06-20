import { Author, Book } from "@prisma/client";
import { motion } from "framer-motion";
import { getAuthor } from "../../shared/transformers";
import { useEffect, useState } from "react";

export interface BadgeProps {
  book: Book;
}

export const ShowBookBadges = ({ items }: { items: Book[] }) => {
  return (
    <div>
      {items.map((item, index) => {
        return <Badge book={item} key={index} />;
      })}
    </div>
  );
};

export const Badge = ({ book }: { book: Book }) => {
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchThisAuthor = async () => {
      const thisAuthor = await getAuthor(book.authorId);
      setAuthor(thisAuthor);
    };
    fetchThisAuthor();
  }, [author]);

  const bookCover = book.imageUrl ? book.imageUrl : "";

  const clickHandler = () => {};

  if (!author) {
    return <div>loading...</div>;
  }

  return (
    <motion.div
      className="flex flex-col  bg-blue-100 m-5 p-5 rounded-lg w-[180px] text-center    
        hover:bg-yellow-200 
        hover:text-yellow-950"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <a onClick={() => clickHandler()}>
        <div className="mb-5 text-center">{book.name}</div>
        <div className="mb-5 text-center">{author.name}</div>
        <img src={bookCover} className="w-[120px] rounded-lg text-center" />
      </a>
    </motion.div>
  );
};
