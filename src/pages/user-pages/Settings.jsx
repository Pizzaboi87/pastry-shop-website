import { TransitionParent } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const Settings = () => {
  return (
    <TransitionParent isFlex>
      <h1 className={userPageStyle.title}>{otherText.settingsTitle}</h1>
    </TransitionParent>
  );
};

export default Settings;
