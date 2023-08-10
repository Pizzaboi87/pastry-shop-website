import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";
import { useParams } from "react-router-dom";
import { getAllUser } from "../../utils/firebase";
import { Loading, UserAccountForm } from "../../components";

const UserDetailsPage = () => {
  const { text } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      await getAllUser().then((users) =>
        setSelectedUser(users.filter((user) => user.id === id)[0])
      );
      setIsLoading(false);
    };

    fetchUsers();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{`${
        selectedUser.displayName ? selectedUser.displayName : "User"
      }'s Personal page`}</h1>

      <UserAccountForm
        userData={selectedUser}
        setUserData={setSelectedUser}
        currentUser={selectedUser}
      />
    </div>
  );
};

export default UserDetailsPage;
