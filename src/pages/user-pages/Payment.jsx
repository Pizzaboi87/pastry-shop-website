import { CartContext, UserContext } from "../../context";
import { TransitionParent, UserPanel } from "../../components";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Theme_H1,
  Theme_Button,
  userPageStyle,
  myCartStyle,
  Theme_Div,
  Theme_Span,
} from "../../styles";

const Payment = () => {
  const navigate = useNavigate();
  const { text } = useContext(UserContext);
  const { orderDetails, setOrderDetails } = useContext(CartContext);

  const handlePayment = (e) => {
    setOrderDetails((orderDetails) => ({
      ...orderDetails,
      paymentMethod: e.target.value,
    }));
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
            <div className="h-[10rem] flex items-center justify-center bg-[#2ad] xl:mx-[2.5%] mb-4 rounded-xl">
              <h1>Placeholder for stripe payment</h1>
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
              >
                Pay
                <Icon icon="mdi:cash-multiple" />
              </Theme_Button>
            </span>
          </div>
        </Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Payment;
