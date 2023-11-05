import { Icon } from "@iconify/react";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import {
  Theme_Div,
  Theme_Span,
  myCartStyle,
  paymentFormStyle,
} from "../styles";

const PaymentForm = ({ children }) => {
  const { text } = useContext(UserContext);
  const { orderDetails, setOrderDetails } = useContext(CartContext);

  const handlePayment = (e) => {
    setOrderDetails((orderDetails) => ({
      ...orderDetails,
      paymentMethod: e.target.value,
    }));
  };

  return (
    <>
      <form className={paymentFormStyle.container}>
        <h1 className={myCartStyle.subTitle}>{text.payment.title}</h1>
        <div className={paymentFormStyle.buttonContainer}>
          <label className={paymentFormStyle.label}>
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={orderDetails.paymentMethod == "credit"}
              className={paymentFormStyle.inputHide}
              onChange={handlePayment}
            />
            <Theme_Span
              $bgcolor="light"
              $hoverbgcolor="glasslight"
              className={paymentFormStyle.span}
            >
              <span className={paymentFormStyle.cardsContainer}>
                <Icon
                  icon="logos:mastercard"
                  className={paymentFormStyle.mastercard}
                />
                <p> / </p>
                <Icon icon="logos:visa" className={paymentFormStyle.visa} />
              </span>
              <p className={paymentFormStyle.optionTitle}>
                {text.payment.card}
              </p>
            </Theme_Span>
          </label>

          <label className={paymentFormStyle.label}>
            <input
              type="radio"
              name="payment"
              value="cashDelivery"
              checked={orderDetails.paymentMethod == "cashDelivery"}
              className={paymentFormStyle.inputHide}
              onChange={handlePayment}
            />
            <Theme_Span
              $bgcolor="light"
              $hoverbgcolor="glasslight"
              className={paymentFormStyle.span}
            >
              <Icon
                icon="mdi:cash-multiple"
                className={paymentFormStyle.icon}
              />
              <p className={paymentFormStyle.optionTitle}>
                {text.payment.cashDelivery}
              </p>
            </Theme_Span>
          </label>

          <label className={paymentFormStyle.label}>
            <input
              type="radio"
              name="payment"
              value="creditDelivery"
              checked={orderDetails.paymentMethod == "creditDelivery"}
              className={paymentFormStyle.inputHide}
              onChange={handlePayment}
            />
            <Theme_Span
              $bgcolor="light"
              $hoverbgcolor="glasslight"
              className={paymentFormStyle.span}
            >
              <Icon
                icon="fontisto:shopping-pos-machine"
                className={paymentFormStyle.icon}
              />
              <p className={paymentFormStyle.optionTitle}>
                {text.payment.cardDelivery}
              </p>
            </Theme_Span>
          </label>
        </div>
      </form>

      {orderDetails.paymentMethod == "credit" && (
        <div className={paymentFormStyle.stripeContainer}>
          <Theme_Div
            $bgcolor="background"
            $bordercolor="transparent"
            id="payment-form"
            className={paymentFormStyle.stripeForm}
          >
            {children}
          </Theme_Div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
