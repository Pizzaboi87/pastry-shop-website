import { TransitionParent, UserPanel } from "../../components";
import { text } from "../../constants";
import { Theme_H1, userPageStyle } from "../../styles";

const Favourites = () => {
  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.favouritesTitle}
      </Theme_H1>

      <UserPanel>
        <div className="h-[30rem] w-full bg-yellowdark"></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Favourites;
