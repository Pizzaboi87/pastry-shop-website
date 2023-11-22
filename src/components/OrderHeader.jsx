import { Icon } from "@iconify/react";
import { allOrderStyle } from "../styles";

const OrderHeader = ({ header, filteredUsers, setFilteredUsers }) => {
  const sortValues = (sortSelector) => {
    let sortedUsers = [...filteredUsers].sort((a, b) =>
      a[sortSelector].localeCompare(b[sortSelector])
    );

    if (sortedUsers[0][sortSelector] === filteredUsers[0][sortSelector]) {
      sortedUsers = [...filteredUsers].sort((a, b) =>
        b[sortSelector].localeCompare(a[sortSelector])
      );
    }

    setFilteredUsers(sortedUsers);
  };

  return (
    <li className={`${header.style} ${allOrderStyle.header}`}>
      {header.title}

      {header.id === "fullName" ||
      header.id === "email" ||
      header.id === "phone" ? (
        <Icon
          icon="solar:round-sort-vertical-broken"
          className={allOrderStyle.sortIcon}
          onClick={() => sortValues(header.id)}
        />
      ) : null}
    </li>
  );
};

export default OrderHeader;
