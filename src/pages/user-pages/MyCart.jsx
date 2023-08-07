import { useContext } from "react";
import { LanguageContext } from "../../context";
import { TransitionParent, UserPanel } from "../../components";
import { Theme_Div, Theme_H1, userPageStyle } from "../../styles";

const MyCart = () => {
  const { text } = useContext(LanguageContext);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.myCartTitle}
      </Theme_H1>

      <UserPanel>
        <Theme_Div $bgcolor="primary" className="w-full h-[30rem]">
          My Cart
        </Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default MyCart;
