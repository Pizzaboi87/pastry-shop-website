import { CartContext, UserContext } from "../../context";
import { PaymentForm, TransitionParent, UserPanel } from "../../components";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Theme_H1,
  Theme_Button,
  userPageStyle,
  myCartStyle,
  Theme_Div,
} from "../../styles";

const Payment = () => {
  const navigate = useNavigate();
  const { text } = useContext(UserContext);
  const { orderDetails } = useContext(CartContext);

  console.log(orderDetails);

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
          <PaymentForm />

          <div className={myCartStyle.buttonContainer}>
            <span className={myCartStyle.buttonSpan}>
              <Theme_Button
                $bgcolor="logo"
                $textcolor="textlight"
                $bordercolor="transparent"
                $hoverbgcolor="dark"
                $hovertextcolor="textlight"
                onClick={() => navigate("/shipping")}
                className={myCartStyle.button}
              >
                <Icon icon="line-md:arrow-left-circle" />
                {text.cart.back}
              </Theme_Button>
            </span>
          </div>
        </Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Payment;
