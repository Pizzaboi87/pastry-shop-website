import { Fragment, useContext } from "react";
import { Theme_Span, paymentFormStyle } from "../styles";
import { CartContext, UserContext } from "../context";
import { Icon } from "@iconify/react";

const PaymentSelectButton = ({ handlePayment, value, icons }) => {
  const { text } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);

  return (
    <label className={paymentFormStyle.label}>
      <input
        type="radio"
        name="payment"
        value={value}
        checked={orderDetails.paymentMethod == value}
        className={paymentFormStyle.inputHide}
        onChange={handlePayment}
      />
      <Theme_Span
        $bgcolor="light"
        $hoverbgcolor="glasslight"
        className={paymentFormStyle.span}
      >
        <span className={paymentFormStyle.cardsContainer}>
          {icons.map((item, index) => {
            return (
              <Fragment key={index}>
                <Icon icon={item} className={paymentFormStyle.icon} />
                {index < icons.length - 1 ? <p> / </p> : null}
              </Fragment>
            );
          })}
        </span>

        <p className={paymentFormStyle.optionTitle}>{text.payment[value]}</p>
      </Theme_Span>
    </label>
  );
};

export default PaymentSelectButton;
