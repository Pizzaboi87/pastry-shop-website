import { UserContext } from "../../context";
import { useContext } from "react";
import { lost } from "../../assets";
import { adminPageStyle } from "../../styles";

const DeletedUser = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.deletedUser}</h1>
      <img src={lost} alt="lost" className={adminPageStyle.lost} />
    </div>
  );
};

export default DeletedUser;
