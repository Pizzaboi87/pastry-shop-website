import { authMiddleware, database } from "../src/utils/authMiddleware.js";

const storeProductHandler = async (req, res) => {
  const product = JSON.parse(req.body);
  const productsRef = database.ref(`products/${product.category}/`);

  try {
    await productsRef.child(product.id).set(product);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error verifying during product uploading:", error);
    res.status(401).json({ message: "Upload error" });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => storeProductHandler(req, res));
};
