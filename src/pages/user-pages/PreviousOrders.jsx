import { UserContext } from "../../context";
import { useContext } from "react";
import { TransitionParent, UserPanel } from "../../components";
import { Theme_H1, userPageStyle, previousOrdersStyle } from "../../styles";

const PreviousOrders = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.previousOrdersTitle}
      </Theme_H1>

      <UserPanel>
        <div className={previousOrdersStyle.container}></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default PreviousOrders;
