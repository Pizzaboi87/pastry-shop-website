import { UserContext } from "../../context";
import { TransitionParent } from "../../components";
import { useContext } from "react";
import { error404 } from "../../assets";
import { Theme_H1, notFoundStyle } from "../../styles";

const NotFound = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={notFoundStyle.main}>
        {text.notFound.message}
      </Theme_H1>
      <span className={notFoundStyle.container}>
        <h1 className={notFoundStyle.title}>{text.notFound.error}</h1>
        <img src={error404} alt="404 error" className={notFoundStyle.image} />
      </span>
    </TransitionParent>
  );
};

export default NotFound;
