import { CartContext, UserContext } from "../../context";
import { TransitionParent, UserPanel } from "../../components";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Theme_H1,
  Theme_Button,
  userPageStyle,
  myCartStyle,
  Theme_Div,
  Theme_Span,
} from "../../styles";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSwalMessage } from "../../utils/useSwalMessage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

  const { text, userData } = useContext(UserContext);
  const { orderDetails, setOrderDetails } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const SwalLoader = () => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-[2rem]">Please wait</h1>
        <Icon icon="eos-icons:loading" className="text-[3rem] text-[#33d]" />
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
    MySwal.close();
    showErrorSwal(error, "Please try again later.");
  };

  const handlePayment = (e) => {
    setOrderDetails((orderDetails) => ({
      ...orderDetails,
      paymentMethod: e.target.value,
    }));
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
        showSuccessSwal("Payment was successful.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      handleError(error);
    }
  };

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        Payment details
      </Theme_H1>
      <UserPanel>
        <Theme_Div
          $bgcolor="transparent"
          $bordercolor="transparent"
          className={myCartStyle.paymentContainer}
        >
          <form className="bg-white xl:mx-[2.5%] mb-4 rounded-xl p-4">
            <h1 className="text-[1.4rem] font-[500]">
              Choose your Payment method
            </h1>
            <div className="flex justify-between mt-4">
              <label className="flex items-center justify-center cursor-pointer p-3 w-[15rem]">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={orderDetails.paymentMethod == "credit"}
                  className="appearance-none"
                  onChange={handlePayment}
                />
                <Theme_Span
                  $bgcolor="light"
                  $hoverbgcolor="glasslight"
                  className="w-full h-full p-3 rounded-xl flex flex-col items-center justify-center"
                >
                  <span className="flex items-center justify-center gap-1">
                    <Icon icon="logos:mastercard" className="text-[1rem]" />
                    <p> / </p>
                    <Icon icon="logos:visa" className="text-[0.6rem]" />
                  </span>
                  <p className="text-[1rem] font-[500]">Credit Card</p>
                </Theme_Span>
              </label>

              <label className="flex items-center justify-center cursor-pointer p-3 w-[15rem]">
                <input
                  type="radio"
                  name="payment"
                  value="cashDelivery"
                  checked={orderDetails.paymentMethod == "cashDelivery"}
                  className="appearance-none"
                  onChange={handlePayment}
                />
                <Theme_Span
                  $bgcolor="light"
                  $hoverbgcolor="glasslight"
                  className="w-full h-full p-3 rounded-xl flex flex-col items-center justify-center"
                >
                  <Icon icon="mdi:cash-multiple" className="text-[1.5rem]" />
                  <p className="text-[1rem] font-[500]">Cash on Delivery</p>
                </Theme_Span>
              </label>

              <label className="flex items-center justify-center cursor-pointer p-3 w-[15rem]">
                <input
                  type="radio"
                  name="payment"
                  value="creditDelivery"
                  checked={orderDetails.paymentMethod == "creditDelivery"}
                  className="appearance-none"
                  onChange={handlePayment}
                />
                <Theme_Span
                  $bgcolor="light"
                  $hoverbgcolor="glasslight"
                  className="w-full h-full p-3 rounded-xl flex flex-col items-center justify-center"
                >
                  <Icon
                    icon="fontisto:shopping-pos-machine"
                    className="text-[1.5rem]"
                  />
                  <p className="text-[1rem] font-[500]">
                    Credit Card on Delivery
                  </p>
                </Theme_Span>
              </label>
            </div>
          </form>

          {orderDetails.paymentMethod == "credit" && (
            <div className="h-auto min-h-[10rem] flex items-center justify-center xl:mx-[2.5%] mb-4 rounded-xl">
              <Theme_Div
                $bgcolor="background"
                $bordercolor="transparent"
                id="payment-form"
                className="w-[30rem] h-full bg-white text-[1.5rem] my-6"
              >
                <PaymentElement />
              </Theme_Div>
            </div>
          )}

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
                className={`${myCartStyle.button} ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
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
                className={`${myCartStyle.button} ${
                  loading ? "cursor-progress" : "cursor-pointer"
                }`}
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
