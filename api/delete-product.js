import {
  authMiddleware,
  database,
  storage,
} from "../src/utils/authMiddleware.js";

const deleteProductHandler = async (req, res) => {
  const productIdToDelete = req.headers["product-id"];
  const productCategory = req.headers["product-category"];
  const productImage = req.headers["product-image"];

  try {
    const productRef = database.ref(
      `products/${productCategory}/${productIdToDelete}`
    );
    const productSnapshot = await productRef.once("value");
    const productData = productSnapshot.val();

    if (!productData) {
      return res.status(404).json({ message: "Product not found." });
    }

    const bucket = storage.bucket();
    const file = bucket.file(`products/${productCategory}/${productImage}`);

    await file.delete();
    await productRef.remove();

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product and image:", error);
    res.status(500).json({ message: "An error occurred." });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => deleteProductHandler(req, res));
};
