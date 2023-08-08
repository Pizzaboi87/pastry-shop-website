import { useContext } from "react";
import { LanguageContext, CurrencyContext } from "../../context";
import { TransitionParent, UserPanel } from "../../components";
import { Theme_Div, Theme_H1, userPageStyle } from "../../styles";

const MyCart = () => {
  const { text } = useContext(LanguageContext);
  const { currency } = useContext(CurrencyContext);

  const amount = 15;

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.myCartTitle}
      </Theme_H1>

      <UserPanel>
        <Theme_Div
          $bgcolor="primary"
          $bordercolor="transparent"
          className="w-full h-[30rem]"
        >
          <h1 className="text-[3rem]">{`Test amount: ${
            currency.value * amount
          }${currency.symbol}`}</h1>
        </Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default MyCart;
