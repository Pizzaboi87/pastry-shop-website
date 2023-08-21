import { createContext, useState, useEffect, useContext } from "react";
import { getStoredImage, getAllPost, getAllComments } from "../utils/firebase";
import { Loading } from "../components";
import { UserContext } from "./user.context";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [allBlogPost, setAllBlogPost] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [firebaseData, setFirebaseData] = useState({});
  const [firebaseComments, setFirebaseComments] = useState({});
  const { userLanguage } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPost(userLanguage);
        setFirebaseData(data);
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, [userLanguage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = await Promise.all(
          Object.keys(firebaseData).map(async (postid) => {
            const element = firebaseData[postid];
            const imageUrl = await getStoredImage(element.image);
            return { ...element, postid, image: imageUrl };
          })
        );

        setAllBlogPost(
          processedData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        );
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, [firebaseData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllComments();
        setFirebaseComments(data);
      } catch (error) {
        console.error("An error happened during comments fetching.", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsArray = Object.values(firebaseComments);
        setAllComments(commentsArray.sort((a, b) => b.date - a.date));
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, [firebaseComments]);

  if (allBlogPost.length === 0 || allComments.length === 0) return <Loading />;

  const value = {
    allBlogPost,
    setAllBlogPost,
    firebaseData,
    setFirebaseData,
    allComments,
    setAllComments,
    firebaseComments,
    setFirebaseComments,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
