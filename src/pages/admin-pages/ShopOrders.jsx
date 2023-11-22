import { UserContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { adminPageStyle, allOrderStyle, tooltipStyle } from "../../styles";
import { getStoredImage, getUserImage } from "../../utils/firebase";

const ShopOrders = () => {
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isDescending, setIsDescending] = useState(true);
  const [openAccordionUserIds, setOpenAccordionUserIds] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const navigate = useNavigate();

  const allUserQuery = async () => {
    const users = await getAllUser(currentUser);
    return users;
  };

  const { data: users, isLoading } = useQuery("userComments", allUserQuery);

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

  const sendMail = (userName, email) => {
    const subject = `${text.emailOrderSubject}}`;
    const body = `${text.recipient} ${userName}${
      userLanguage == "hun" ? "!" : ","
    } \n\n${text.emailFooter}\n\u{1F517} ${text.website}`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  const toDetailsPage = (id) => {
    if (id) navigate(`/admin/users/${id}`);
    else navigate(`/admin/users/deleted-user`);
  };
  /*
  const changePublish = (comment) => {
    changeCommentStatus(comment.id, !comment.isPublished).then(() => {
      const newComments = allComments.map((com) =>
        com.id === comment.id ? { ...com, isPublished: !com.isPublished } : com
      );
      setAllComments(newComments);
    });
  };
*/

  /*const sortValues = (id) => {
    let sortedComments;
    switch (id) {
      case "date":
        sortedComments = [...filteredComments].sort((a, b) => a.date - b.date);
        break;
      case "name":
        sortedComments = [...filteredComments].sort((a, b) =>
          a.author.localeCompare(b.author)
        );
        break;
      default:
        sortedComments = [...filteredComments].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }

    if (!isDescending) {
      sortedComments.reverse();
    }

    setFilteredComments(sortedComments);
    setIsDescending(!isDescending);
  };*/

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user") {
      setUserFilter(value);
    } else {
      setOrderFilter(value);
    }
  };

  useEffect(() => {
    const filteringResult = updatedUsers
      .map((user) => {
        const filteredOrders = user.orders.filter(
          (order) =>
            order.orderID.toLowerCase().includes(orderFilter.toLowerCase()) ||
            order.orderTime.toLowerCase().includes(orderFilter.toLowerCase()) ||
            order.paymentMethod
              .toLowerCase()
              .includes(orderFilter.toLowerCase()) ||
            order.amount
              .toString()
              .toLowerCase()
              .includes(orderFilter.toLowerCase())
        );

        return {
          ...user,
          orders: filteredOrders,
        };
      })
      .filter(
        (user) =>
          (user.fullName.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.email.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.phone.toLowerCase().includes(userFilter.toLowerCase())) &&
          user.orders.length > 0
      );

    setFilteredUsers(filteringResult);
  }, [userFilter, orderFilter]);

  const handleAccordionById = (userId) => {
    setOpenAccordionUserIds((prevOpenIds) => {
      if (prevOpenIds.includes(userId)) {
        return prevOpenIds.filter((id) => id !== userId);
      } else {
        return [...prevOpenIds, userId];
      }
    });
  };

  if (updatedUsers.length === 0 || isLoading) return <Loading />;

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopOrdersTitle}</h1>

      <form onSubmit={() => {}} className="flex xl:flex-row flex-col gap-4">
        <input
          className={allOrderStyle.input}
          type="text"
          placeholder="keresés felhasználó adataira"
          name="user"
          value={userFilter}
          onChange={handleChange}
        />

        <input
          className={allOrderStyle.input}
          type="text"
          placeholder="keresés rendelés adataira"
          name="order"
          value={orderFilter}
          onChange={handleChange}
        />
      </form>

      <ul className={allOrderStyle.list}>
        {text.ordersHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} ${allOrderStyle.header}`}
          >
            {header.title}

            {header.id === "name" ||
            header.id === "email" ||
            header.id === "phone" ? (
              <Icon
                icon="solar:round-sort-vertical-broken"
                className={allOrderStyle.sortIcon}
                onClick={() => sortValues(header.id)}
              />
            ) : null}
          </li>
        ))}

        {filteredUsers.map((user) => {
          const { id, imgsrc, fullName, email, phone, orders } = user;

          return (
            <ul className={allOrderStyle.container} key={id}>
              <li className={allOrderStyle.imageContainer}>
                <img
                  src={imgsrc}
                  alt="profile"
                  className={allOrderStyle.image}
                  onClick={() => toDetailsPage(id)}
                />
              </li>
              <li className={allOrderStyle.textContainer}>
                <p
                  className={allOrderStyle.name}
                  onClick={() => toDetailsPage(id)}
                >
                  {fullName}
                </p>
              </li>
              <li className={allOrderStyle.emailContainer}>
                <p
                  className={allOrderStyle.hoverText}
                  onClick={() => sendMail(fullName, email)}
                >
                  {email}
                </p>
              </li>
              <li className={allOrderStyle.textContainer}>
                <p className={allOrderStyle.normalText}>{phone}</p>
              </li>
              <li className={allOrderStyle.iconContainer}>
                <Icon
                  icon="material-symbols:expand-circle-down-outline"
                  className={`expand ${allOrderStyle.icon} ${allOrderStyle.hoverText}`}
                  onClick={() => handleAccordionById(id)}
                />
              </li>
              <hr className={allOrderStyle.hrLine} />
              {orders.map((order) => {
                const {
                  orderID,
                  orderTime,
                  amount,
                  currency,
                  paymentMethod,
                  status,
                } = order;

                if (openAccordionUserIds.includes(id))
                  return (
                    <motion.ul
                      className={allOrderStyle.orderContainer}
                      key={orderTime}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <li className={allOrderStyle.bigDetailContainer}>
                        <p className={allOrderStyle.normalText}>{orderID}</p>
                      </li>
                      <li className={allOrderStyle.detailContainer}>
                        <p className={allOrderStyle.normalText}>
                          {orderTime.slice(0, 19)}
                        </p>
                      </li>
                      <li className={allOrderStyle.smallDetailContainer}>
                        <p className={allOrderStyle.normalText}>
                          {amount}
                          {currency.symbol}
                        </p>
                      </li>
                      <li className={allOrderStyle.detailContainer}>
                        <p className={allOrderStyle.normalText}>
                          {paymentMethod}
                        </p>
                      </li>
                      <li className={allOrderStyle.iconContainer}>
                        <Icon
                          icon="raphael:edit"
                          className={`details ${allOrderStyle.icon} ${allOrderStyle.hoverText}`}
                        />
                        <Icon
                          icon="mdi:truck-delivery"
                          className={`${allOrderStyle.icon} ${allOrderStyle.hoverText}`}
                        />
                      </li>
                    </motion.ul>
                  );
              })}
            </ul>
          );
        })}
      </ul>
      {/*
      MÉG NINCS KÉSZ
      <Tooltip
        anchorSelect=".delivered"
        content={text.tooltip.published}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".new"
        content={text.tooltip.hided}
        style={tooltipStyle}
        place="top"
      />*/}
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
