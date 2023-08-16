import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";
import { useNavigate, useParams } from "react-router-dom";
import { Loading, UserAccountForm } from "../../components";
import { Icon } from "@iconify/react";
import { deleteUser, getAllUser } from "../../utils/firebase-admin";
import { useQuery } from "react-query";

const UserDetailsPage = () => {
  const { text, currentUser } = useContext(UserContext);
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
      setResult
    );
  };

  if (isLoading || isDeleting || !selectedUser) return <Loading />;

  return (
    <div className={`${adminPageStyle.wrapper} relative`}>
      <h1 className={adminPageStyle.title}>{`${
        selectedUser.displayName ? selectedUser.displayName : "User"
      }'s Personal page`}</h1>

      <Icon
        icon="bi:trash3-fill"
        className="delete outline-none text-text text-[3rem] hover:text-logopink cursor-pointer absolute top-[1rem] left-[1rem]"
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
