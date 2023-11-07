import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CartContext, UserContext } from "../../context";
import { PaymentForm, TransitionParent, UserPanel } from "../../components";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwalMessage } from "../../utils/useSwalMessage";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Theme_H1,
  Theme_Button,
  userPageStyle,
  myCartStyle,
  Theme_Div,
} from "../../styles";

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { text, userData } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

  console.log(orderDetails);

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
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.payment.mainTitle}
      </Theme_H1>
      <UserPanel>
        <Theme_Div
          $bgcolor="transparent"
          $bordercolor="transparent"
          className={myCartStyle.paymentContainer}
        >
          <PaymentForm>
            <PaymentElement />
          </PaymentForm>

          <div className={myCartStyle.buttonContainer}>
            <span className={myCartStyle.buttonSpan}>
              <Theme_Button
                $bgcolor="logo"
                $textcolor="textlight"
                $bordercolor="transparent"
                $hoverbgcolor="dark"
                $hovertextcolor="textlight"
                onClick={() => navigate("/shipping")}
                disabled={loading}
                className={myCartStyle.button}
              >
                <Icon icon="line-md:arrow-left-circle" />
                {text.cart.back}
              </Theme_Button>
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
                {loading ? (
                  <Icon icon="eos-icons:loading" />
                ) : (
                  <Icon icon="mdi:cash-multiple" />
                )}
              </Theme_Button>
            </span>
          </div>
        </Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Payment;
