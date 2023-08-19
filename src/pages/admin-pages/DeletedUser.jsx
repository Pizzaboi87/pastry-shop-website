import { useContext } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";
import { lost } from "../../assets";

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
