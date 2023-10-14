import { Icon } from "@iconify/react";
import { getStoredImage } from "../utils/firebase";
import { useEffect, useState } from "react";

const ProductCard = ({ category, product, userLanguage }) => {
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const image = await getStoredImage(
        `products/${category.toLowerCase()}/${product.image}`
      );
      setProductImage(image);
    };

    if (product) getImage();
  }, [product]);

  return (
    <div className="w-[15rem] h-[30rem] relative flex flex-col rounded-xl">
      <div className="w-full h-[15rem] rounded-t-xl overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center hover:scale-[120%] transition duration-300 ease-in-out cursor-pointer"
          style={{ backgroundImage: `url(${productImage})` }}
        />
      </div>

      <div className="w-full h-[0.4rem] bg-transparent" />

      <div className="w-full min-h-[10rem] shadow-xl bg-[#fefefe] p-2 flex flex-col relative">
        <span className="flex text-[#f70] self-center">
          {Array.from({ length: product.rate }, (v, i) => i).map((_, index) => (
            <Icon key={index} icon="carbon-star-filled" />
          ))}
          {Array.from({ length: 5 - product.rate }, (v, i) => i).map(
            (_, index) => (
              <Icon key={index} icon="carbon-star" />
            )
          )}
        </span>
        <h1 className="self-center text-center font-[600] my-2">
          {product.name[userLanguage]}
        </h1>
        <h2 className="self-center text-center font-[400]">
          {product.comment}
        </h2>
        <h3 className="absolute self-end bottom-2 text-[1.5rem] font-[700]">{`${product.price}$`}</h3>
      </div>

      <div className="w-full h-[0.4rem] bg-transparent" />

      <button className="w-full h-[2rem] bg-[#e45a84] bottom-0 rounded-b-xl shadow-xl text-white hover:text-[#e45a84] hover:bg-white flex items-center gap-1 justify-center">
        <Icon icon="grommet-icons:cart" />
        <p className="font-[600] py-1">Add to Cart</p>
      </button>
    </div>
  );
};

export default ProductCard;
