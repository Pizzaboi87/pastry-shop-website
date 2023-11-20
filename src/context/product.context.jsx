import { createContext, useEffect, useState } from "react";
import { getData, getStoredImage } from "../utils/firebase";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [firebaseProducts, setFirebaseProducts] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("products/");
        setFirebaseProducts(data);
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getData("products/");
        const processedData = [];

        await Promise.all(
          Object.keys(data).map(async (id) => {
            const elements = data[id];

            for (const key in elements) {
              if (Object.hasOwnProperty.call(elements, key)) {
                const element = elements[key];
                const imageUrl = await getStoredImage(
                  `products/${element.category}/${element.image}`
                );
                const processedElement = { ...element, imageURL: imageUrl };
                processedData.push(processedElement);
              }
            }
          })
        );

        setAllProducts(processedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("An error happened during data processing.", error);
      }
    };

    fetchData();
  }, [firebaseProducts]);

  const value = {
    firebaseProducts,
    allProducts,
    setFirebaseProducts,
    loading,
    setLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
