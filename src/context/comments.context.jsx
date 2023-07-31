import { createContext, useState, useEffect } from "react";
import { getAllComments } from "../utils/firebase";
import { Loading } from "../components";

export const CommentsContext = createContext();

export const CommentsContextProvider = ({ children }) => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firebaseData = await getAllComments();
        const commentsArray = Object.values(firebaseData);
        setAllComments(commentsArray.sort((a, b) => b.date - a.date));
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, []);

  if (allComments.length === 0) return <Loading />;
  const value = { allComments, setAllComments };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
