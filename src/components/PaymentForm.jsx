import PaymentSelectButton from "./PaymentSelectButton";
import PayPal from "./PayPal";
import Stripe from "./Stripe";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import { Theme_Div, myCartStyle, paymentFormStyle } from "../styles";
import GooglePay from "./GooglePay";

const PaymentForm = () => {
  const { text } = useContext(UserContext);
  const { orderDetails, setOrderDetails } = useContext(CartContext);

  const handlePayment = (e) => {
    setOrderDetails((orderDetails) => ({
      ...orderDetails,
      paymentMethod: e.target.value,
    }));
  };

  const buttons = [
    {
      value: "credit",
      icons: ["logos:mastercard", "logos:visaelectron"],
    },
    {
      value: "payPal",
      icons: ["logos:paypal"],
    },
    {
      value: "googlePay",
      icons: ["logos:google-pay"],
    },
    {
      value: "payOnDelivery",
      icons: ["mdi:cash-multiple", "fontisto:shopping-pos-machine"],
    },
  ];

  const buttonList = buttons.map((button) => (
    <PaymentSelectButton
      key={button.value}
      value={button.value}
      icons={button.icons}
      handlePayment={handlePayment}
    />
  ));

  return (
    <>
      <form className={paymentFormStyle.container}>
        <h1 className={myCartStyle.subTitle}>{text.payment.title}</h1>
        <div className={paymentFormStyle.buttonContainer}>{buttonList}</div>
      </form>

      <div className={paymentFormStyle.paymentContainer}>
        <Theme_Div
          $bgcolor="background"
          $bordercolor="transparent"
          id="payment-form"
          className={paymentFormStyle.paymentForm}
        >
          {orderDetails.paymentMethod == "credit" && <Stripe />}

          {orderDetails.paymentMethod == "payPal" && <PayPal />}

          {orderDetails.paymentMethod == "googlePay" && <GooglePay />}
        </Theme_Div>
      </div>
    </>
  );
};

export default PaymentForm;
