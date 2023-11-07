import { Theme_Div, paymentFormStyle } from "../styles";

const Stripe = ({ children }) => {
  return (
    <div className={paymentFormStyle.paymentContainer}>
      <Theme_Div
        $bgcolor="background"
        $bordercolor="transparent"
        id="payment-form"
        className={paymentFormStyle.stripeForm}
      >
        {children}
      </Theme_Div>
    </div>
  );
};

export default Stripe;
