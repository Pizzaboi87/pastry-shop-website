import { useContext } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";

const DeletedUser = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>Deleted User</h1>
    </div>
  );
};

export default DeletedUser;
