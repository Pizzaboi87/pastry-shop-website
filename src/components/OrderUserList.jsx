import OrderList from "./OrderList";
import { Icon } from "@iconify/react";
import { UserContext } from "../context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allOrderStyle } from "../styles";

const OrderUserList = ({ user }) => {
  const { text, userLanguage } = useContext(UserContext);
  const { id, imgsrc, fullName, email, phone, orders } = user;
  const [openAccordionUserIds, setOpenAccordionUserIds] = useState([]);
  const navigate = useNavigate();

  const handleAccordionById = (userId) => {
    setOpenAccordionUserIds((prevOpenIds) => {
      if (prevOpenIds.includes(userId)) {
        return prevOpenIds.filter((id) => id !== userId);
      } else {
        return [...prevOpenIds, userId];
      }
    });
  };

  const toDetailsPage = (id) => {
    if (id) navigate(`/admin/users/${id}`);
    else navigate(`/admin/users/deleted-user`);
  };

  const sendMail = (userName, email) => {
    const subject = `${text.emailOrderSubject}`;
    const body = `${text.recipient} ${userName}${
      userLanguage == "hun" ? "!" : ","
    } \n\n${text.emailFooter}\n\u{1F517} ${text.website}`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  return (
    <ul className={allOrderStyle.container}>
      <li className={allOrderStyle.imageContainer}>
        <img
          src={imgsrc}
          alt="profile"
          className={allOrderStyle.image}
          onClick={() => toDetailsPage(id)}
        />
      </li>
      <li className={allOrderStyle.textContainer}>
        <p className={allOrderStyle.name} onClick={() => toDetailsPage(id)}>
          {fullName}
        </p>
      </li>
      <li
        className={allOrderStyle.emailContainer}
        onClick={() => sendMail(fullName, email)}
      >
        <p className={allOrderStyle.hoverText}>{email}</p>
      </li>
      <li className={allOrderStyle.textContainer}>
        <p className={allOrderStyle.normalText}>{`+${phone}`}</p>
      </li>
      <li className={allOrderStyle.iconContainer}>
        <Icon
          icon="material-symbols:expand-circle-down-outline"
          vFlip={openAccordionUserIds.includes(id) ? true : false}
          className={`expand ${allOrderStyle.icon} ${allOrderStyle.hoverText}`}
          onClick={() => handleAccordionById(id)}
        />
      </li>
      <hr className={allOrderStyle.hrLine} />
      {orders.map(
        (order) =>
          openAccordionUserIds.includes(id) && (
            <OrderList key={order.orderID} user={user} order={order} />
          )
      )}
    </ul>
  );
};

export default OrderUserList;
