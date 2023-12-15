import { authMiddleware, firestore } from "../src/utils/authMiddleware.js";

const changeDeliveryStatusHandler = async (req, res) => {
  const userSnapshot = await firestore.collection("users").get();

  const user = userSnapshot.docs.find(
    (doc) => doc.id === req.headers["user-id"]
  );

  const orders = user.data().orders;
  const orderIndex = orders.findIndex(
    (order) => order.orderID === req.headers["order-id"]
  );

  if (orderIndex !== -1) {
    orders[orderIndex].isDelivered =
      req.headers["delivery-status"] === "true" ? true : false;

    await firestore.collection("users").doc(user.id).update({
      orders: orders,
    });

    res.status(200).json({ message: "Delivery status updated." });
  } else {
    res.status(404).json({ message: "Order not found." });
  }
};

export default async (req, res) => {
  authMiddleware(req, res, () => changeDeliveryStatusHandler(req, res));
};
