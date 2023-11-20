import { UserContext } from "../context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { storeImage } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import { uploadProduct } from "../utils/firebase-admin";
import { productFormStyle } from "../styles";

const ProductForm = ({ dbPost }) => {
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let uploadFile = {};
  let fileExtension = "";
  let newFileName = "";

  const defaultForm = {
    image: "",
    code: "",
    name: {
      eng: "",
      esp: "",
      fra: "",
      hun: "",
    },
    category: text.productForm.category[0].branch,
    comment: "",
    price: 0.0,
    rating: 5,
    imageFile: {},
  };

  const [productForm, setProductForm] = useState(defaultForm);
  const { code, name, category, comment, price, rating, imageFile, image } =
    productForm;

  const validationRules = {
    code: {
      value: code,
      regex: "password",
      errorMessage: text.productForm.errorCode,
    },
    engName: {
      value: name.eng,
      regex: "normal",
      errorMessage: text.productForm.errorEngName,
    },
    espName: {
      value: name.esp,
      regex: "normal",
      errorMessage: text.productForm.errorEspName,
    },
    fraName: {
      value: name.fra,
      regex: "normal",
      errorMessage: text.productForm.errorFraName,
    },
    hunName: {
      value: name.hun,
      regex: "normal",
      errorMessage: text.productForm.errorHunName,
    },
    comment: {
      value: comment,
      regex: "normal",
      errorMessage: text.productForm.errorComment,
    },
  };

  const { isValid } = useValidation(validationRules);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      fileExtension = files[0].name.split(".").pop();
      newFileName = `${code}.${fileExtension}`;
      uploadFile = new File([files[0]], newFileName);

      const allowedExtensions = ["jpg", "jpeg", "png", "webp", "bmp", "svg"];
      if (!allowedExtensions.some((ext) => fileExtension.includes(ext))) {
        showErrorSwal(text.blogForm.swal.errorType);
        return;
      }
    }

    if (name === "image") {
      setProductForm({
        ...productForm,
        imageFile: uploadFile,
        image: newFileName,
      });
    } else if (["eng", "esp", "fra", "hun"].includes(name)) {
      setProductForm({
        ...productForm,
        name: {
          ...productForm.name,
          [name]: value,
        },
      });
    } else if (name == "price") {
      setProductForm({
        ...productForm,
        [name]: parseFloat(value),
      });
    } else if (name == "name") {
      setProductForm({
        ...productForm,
        [name]: { ...productForm.name, [value]: value },
      });
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid()) return;

    await storeImage(imageFile, `products/${category}/${image}`);
    await uploadProduct(
      text,
      currentUser,
      productForm,
      setIsLoading,
      showErrorSwal,
      showSuccessSwal
    );

    navigate("/admin/shop/products");
  };

  return (
    <form onSubmit={handleSubmit} className={productFormStyle.form}>
      <div className={productFormStyle.container}>
        <label className={productFormStyle.label}>
          {text.productForm.codeLabel}
          <input
            type="text"
            required
            name="code"
            value={code}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.engNameLabel}
          <input
            type="text"
            required
            name="eng"
            value={name.eng}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.espNameLabel}
          <input
            type="text"
            required
            name="esp"
            value={name.esp}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.fraNameLabel}
          <input
            type="text"
            required
            name="fra"
            value={name.fra}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.hunNameLabel}
          <input
            type="text"
            required
            name="hun"
            value={name.hun}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>
      </div>

      <div className={productFormStyle.container}>
        <label className={productFormStyle.label}>
          {text.productForm.categoryLabel}
          <select
            required
            value={category.branch}
            name="category"
            onChange={handleChange}
            className={productFormStyle.select}
          >
            {text.productForm.category.map((category) => (
              <option key={category.id} value={category.branch}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.commentLabel}
          <input
            type="text"
            required
            name="comment"
            value={comment}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.priceLabel}
          <input
            type="number"
            required
            name="price"
            value={price}
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.ratingLabel}
          <select
            required
            value={rating}
            name="rating"
            onChange={handleChange}
            className={productFormStyle.select}
          >
            {Array.from({ length: 5 }, (v, k) => k + 1).map((ratingValue) => (
              <option key={ratingValue} value={ratingValue}>
                {ratingValue}
              </option>
            ))}
          </select>
        </label>

        <label className={productFormStyle.label}>
          {text.productForm.imageLabel}
          <input
            required={dbPost ? false : true}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className={productFormStyle.input}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading ? true : false}
        className={`${productFormStyle.button} ${
          isLoading ? productFormStyle.loading : productFormStyle.pointer
        } `}
      >
        {isLoading ? text.productForm.savingButton : text.productForm.button}
      </button>
    </form>
  );
};

export default ProductForm;
