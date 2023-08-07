import { useContext } from "react";
import { LanguageContext } from "../../context";
import { TransitionParent, UserPanel } from "../../components";
import { Theme_H1, userPageStyle } from "../../styles";

const PreviousOrders = () => {
  const { text } = useContext(LanguageContext);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.previousOrdersTitle}
      </Theme_H1>

      <UserPanel>
        <div className="w-full h-[30rem] bg-purple"></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default PreviousOrders;
