import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserFromDatabase, getAllUser } from "../../utils/firebase";
import { Loading, UserAccountForm } from "../../components";
import { Icon } from "@iconify/react";

const UserDetailsPage = () => {
  const { text, currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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

  const deleteUser = async (user) => {
    try {
      const idToken = await currentUser.getIdToken();

      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "user-id": user.uid,
        },
      });

      if (response.ok) {
        await deleteUserFromDatabase(user).then(() => {
          setIsLoading(false);
          Swal.fire({
            title: text.userDetailsPage.swal.successTitle,
            text: text.userDetailsPage.swal.successText,
            icon: "success",
          });
          navigate("/admin/users/all");
        });
      } else {
        setIsLoading(false);
        Swal.fire({
          title: text.userDetailsPage.swal.errorTitle,
          text: text.userDetailsPage.swal.errorDelete,
          icon: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: text.userDetailsPage.swal.errorTitle,
        text: error.message,
        icon: "error",
      });
    }
  };

  const confirmDelete = (user) => {
    Swal.fire({
      title: text.userDetailsPage.swal.question,
      showDenyButton: true,
      confirmButtonText: text.userDetailsPage.swal.confirm,
      denyButtonText: text.userDetailsPage.swal.cancel,
    }).then((result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        deleteUser(user);
      } else if (result.isDenied) {
        return;
      }
    });
  };

  if (isLoading) return <Loading />;

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
