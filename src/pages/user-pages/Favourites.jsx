import { useContext } from "react";
import { UserContext } from "../../context";
import { UserPanel } from "../../components";
import { Theme_Div, Theme_H1, userPageStyle } from "../../styles";
import { Outlet } from "react-router-dom";

const Favourites = () => {
  const { text } = useContext(UserContext);

  return (
    <Theme_Div
      $bgcolor="glasslight"
      $bordercolor="transparent"
      className="3xl:w-[80%] xl:w-[90%] w-full glass shadow-xl rounded-xl grid grid-cols-6 gap-x-12 md:p-12 p-4"
    >
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.favouritesTitle}
      </Theme_H1>

      <UserPanel>
        <div className="min-h-[30rem] w-full flex flex-col gap-y-6 items-center">
          <Outlet />
        </div>
      </UserPanel>
    </Theme_Div>
  );
};

export default Favourites;
