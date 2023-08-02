import { TransitionParent, UserPanel } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const Favourites = () => {
  return (
    <TransitionParent isFlex={false}>
      <h1 className={userPageStyle.title}>{otherText.favouritesTitle}</h1>

      <UserPanel>
        <div className="h-[30rem] w-full bg-yellowdark"></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Favourites;
