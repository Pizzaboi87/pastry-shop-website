import { UserContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { useContext, useEffect, useState } from "react";
import { getAllUser } from "../../utils/firebase-admin";
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
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      const usersData = await getAllUser(currentUser);

      const defaultImg = await getStoredImage("blog/profile.jpg");

      if (usersData && usersData.users) {
        const usersWithOrders = usersData.users.filter(
          (user) => user.orders && user.orders.length !== 0
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
      }

      setIsLoading(false);
    };

    getAllUsers();
  }, [currentUser]);

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
