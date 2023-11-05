import { TransitionParent, UserPanel } from "../../components";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext } from "react";
import { Theme_H1, userPageStyle, previousOrdersStyle } from "../../styles";

const PreviousOrders = () => {
  const { text, currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

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
