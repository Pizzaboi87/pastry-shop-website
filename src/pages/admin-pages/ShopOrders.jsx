import { UserContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { useContext, useEffect, useState } from "react";
import { getAllUser } from "../../utils/firebase-admin";
import { useQuery } from "react-query";
import { getStoredImage, getUserImage } from "../../utils/firebase";
import { adminPageStyle, allOrderStyle, tooltipStyle } from "../../styles";
import {
  Loading,
  OrderForm,
  OrderHeader,
  OrderUserList,
} from "../../components";

const ShopOrders = () => {
  const { text, currentUser } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState([]);

  const allUserQuery = async () => {
    const users = await getAllUser(currentUser);
    return users;
  };

  const { data: users, isLoading } = useQuery("usersForOrders", allUserQuery);

  useEffect(() => {
    const updateUsersWithPhoto = async () => {
      const defaultImg = await getStoredImage("blog/profile.jpg");

      const usersWithOrders = users.users.filter(
        (user) => user.orders && user.orders.length != 0
      );

      const usersWithPhoto = await Promise.all(
        usersWithOrders.map(async (user) => {
          let imgsrc;
          if (user.photoExtension) imgsrc = await getUserImage(user.uid);
          return { ...user, imgsrc: imgsrc || defaultImg };
        })
      );
      setUpdatedUsers(usersWithPhoto);
      setFilteredUsers(usersWithPhoto);
    };

    if (users) updateUsersWithPhoto();
  }, [users]);

  if (updatedUsers.length === 0 || isLoading) return <Loading />;

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopOrdersTitle}</h1>

      <OrderForm
        updatedUsers={updatedUsers}
        setFilteredUsers={setFilteredUsers}
      />

      <ul className={allOrderStyle.list}>
        {text.ordersHeaders.map((header) => (
          <OrderHeader
            key={header.id}
            header={header}
            filteredUsers={filteredUsers}
            setFilteredUsers={setFilteredUsers}
          />
        ))}

        {filteredUsers.map((user) => (
          <OrderUserList key={user.id} user={user} />
        ))}
      </ul>
      <Tooltip
        anchorSelect=".details"
        content={text.tooltip.orderDetails}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".expand"
        content={text.tooltip.showOrders}
        style={tooltipStyle}
        place="top"
      />
    </div>
  );
};

export default ShopOrders;
