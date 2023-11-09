import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import { usePayment } from "../utils/usePayment";
import { Theme_Button, paymentFormStyle } from "../styles";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const Stripe = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { text, userData } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);
  const { paymentInProgress, setPaymentInProgress, setPaymentSuccess } =
    usePayment();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setPaymentInProgress(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log(submitError);
      setPaymentSuccess(false);
      return;
    }

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderDetails: orderDetails,
          email: userData.email,
          amount: Math.round(parseFloat(orderDetails.amount) * 100),
          currency: orderDetails.currency.name.toLowerCase(),
          uid: userData.uid,
        }),
      });

      if (!response.ok) {
        setPaymentSuccess(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const client_secret = data.paymentIntent.client_secret;

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        redirect: "if_required",
      });

      if (error) {
        console.log(error);
        setPaymentSuccess(false);
      } else {
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setPaymentSuccess(false);
    }
  };

  return (
    <>
      <PaymentElement className={paymentFormStyle.stripeInput} />
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={paymentFormStyle.payButton}
        onClick={paymentHandler}
        disabled={paymentInProgress}
      >
        {text.payment.payNow}
      </Theme_Button>
    </>
  );
};

export default Stripe;
