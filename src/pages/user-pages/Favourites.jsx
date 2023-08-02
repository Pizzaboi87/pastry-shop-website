import { TransitionParent } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const Favourites = () => {
  return (
    <TransitionParent isFlex>
      <h1 className={userPageStyle.title}>{otherText.favouritesTitle}</h1>
    </TransitionParent>
  );
};

export default Favourites;
