import { UserContext } from "../../context";
import { useContext } from "react";
import { TransitionParent, UserPanel } from "../../components";
import { Theme_Div, Theme_H1, myCartStyle, userPageStyle } from "../../styles";

const MyCart = () => {
  const { text, currency } = useContext(UserContext);

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
          className={myCartStyle.container}
        ></Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default MyCart;
