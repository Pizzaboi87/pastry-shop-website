import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Icon } from "@iconify/react";
import { CartContext, UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
import { useSwalMessage } from "../utils/useSwalMessage";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Theme_Button,
  Theme_Div,
  myCartStyle,
  paymentFormStyle,
} from "../styles";

const Stripe = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { text, userData } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const SwalLoader = () => {
    return (
      <div className={myCartStyle.swalContainer}>
        <h1 className={myCartStyle.swalMessage}>{text.cart.wait}</h1>
        <Icon icon="eos-icons:loading" className={myCartStyle.swalIcon} />
      </div>
    );
  };

  useEffect(() => {
    if (loading) {
      MySwal.fire({
        html: <SwalLoader />,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }
  }, [loading]);

  const handleError = (error) => {
    setLoading(false);
    console.log(error);
    MySwal.close();
    showErrorSwal(text.cart.tryAgain);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
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
        handleError(response.statusText);
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
        handleError(error);
      } else {
        setLoading(false);
        MySwal.close();
        showSuccessSwal(text.cart.success);
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
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
        className={myCartStyle.button}
        onClick={paymentHandler}
        disabled={loading}
      >
        Pay
      </Theme_Button>
    </>
  );
};

export default Stripe;
