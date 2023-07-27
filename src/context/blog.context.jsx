import { createContext, useState, useEffect } from "react";
import { getAllPost, getStoredImage } from "../utils/firebase";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [allBlogPost, setAllBlogPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPost();
        const processedData = await Promise.all(
          data.map(async (element) => {
            const imageUrl = await getStoredImage(element.image);
            return { ...element, image: imageUrl };
          })
        );
        setAllBlogPost(processedData);
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, []);

  const value = [allBlogPost, setAllBlogPost];

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
