import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";
import { useParams } from "react-router-dom";
import { deleteCurrentUser, getAllUser } from "../../utils/firebase";
import { Loading, UserAccountForm } from "../../components";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

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

  const deletelUser = async (user) => {
    await deleteCurrentUser(user)
      .then(() => {
        navigate("/admin/users/all");
      })
      .catch((error) => {
        Swal.fire({
          title: text.blogAll.swal.error,
          text: text.blogAll.swal.errorMsg,
          icon: "error",
        });
        console.error("Error deleting user:", error);
      });
  };

  const confirmDelete = (user) => {
    Swal.fire({
      title: text.blogCommentPage.swal.question,
      showDenyButton: true,
      confirmButtonText: text.blogCommentPage.swal.confirm,
      denyButtonText: text.blogCommentPage.swal.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        deletelUser(user);
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
