import { UserContext } from "../../context";
import { Loading, UserAccountForm } from "../../components";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getAllUser } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { useQuery } from "react-query";
import { adminPageStyle } from "../../styles";

const UserDetailsPage = () => {
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const allUserQuery = async () => {
    const users = await getAllUser(currentUser);
    setSelectedUser(users.users.filter((user) => user.id === id)[0]);
  };

  const { data: users, isLoading, refetch } = useQuery("users", allUserQuery);

  useEffect(() => {
    if (result) {
      navigate("/admin/users/all");
    }
  }, [selectedUser, result]);

  const confirmDelete = async (user) => {
    await deleteUser(
      user,
      currentUser,
      text,
      refetch,
      setIsDeleting,
      setResult,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
    );
  };

  if (isLoading || isDeleting || !selectedUser) return <Loading />;

  return (
    <div className={adminPageStyle.wrapperRelative}>
      <h1 className={adminPageStyle.title}>{`${
        selectedUser.displayName ? selectedUser.displayName : "User"
      }'s Personal page`}</h1>

      <Icon
        icon="bi:trash3-fill"
        className={adminPageStyle.deleteIcon}
        onClick={() => confirmDelete(selectedUser)}
      />

      <UserAccountForm
        userData={selectedUser}
        setUserData={setSelectedUser}
        currentUser={selectedUser}
      />
    </div>
  );
};

export default UserDetailsPage;
