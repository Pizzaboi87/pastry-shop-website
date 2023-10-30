import { useContext } from "react";
import { ShippingForm, TransitionParent, UserPanel } from "../../components";
import {
  Theme_H1,
  userPageStyle,
  myCartStyle,
  Theme_Button,
} from "../../styles";
import { UserContext } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData, setUserData, currentUser, text, currency } =
    useContext(UserContext);

  console.log(state);

  return (
    <TransitionParent>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.cart.details}
      </Theme_H1>

      <UserPanel>
        <h1 className="text-[1.5rem] font-[600] text-center">
          {text.cart.address}
        </h1>
        <ShippingForm
          userData={userData}
          setUserData={setUserData}
          currentUser={currentUser}
        />
        <div className={myCartStyle.buttonContainer}>
          <span className={myCartStyle.buttonSpan}>
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              onClick={() => navigate("/mycart")}
              className={myCartStyle.button}
            >
              {text.cart.back}
            </Theme_Button>
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              onClick={() => navigate("/payment")}
              className={myCartStyle.button}
            >
              {text.cart.pay}{" "}
              {state.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              {currency.symbol}
            </Theme_Button>
          </span>
        </div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Checkout;
