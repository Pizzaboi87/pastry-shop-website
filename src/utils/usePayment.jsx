import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Icon } from "@iconify/react";
import { UserContext } from "../context";
import { useContext, useState, useEffect } from "react";
import { useSwalMessage } from "./useSwalMessage";
import { myCartStyle } from "../styles";

export const usePayment = () => {
  const { text } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

  const MySwal = withReactContent(Swal);
  const SwalLoader = () => {
    return (
      <div className={myCartStyle.swalContainer}>
        <h1 className={myCartStyle.swalMessage}>{text.cart.wait}</h1>
        <Icon icon="eos-icons:loading" className={myCartStyle.swalIcon} />
      </div>
    );
  };

  useEffect(() => {
    if (loading) {
      MySwal.fire({
        html: <SwalLoader />,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }
  }, [loading]);

  const handleError = (error) => {
    setLoading(false);
    console.log(error);
    MySwal.close();
    showErrorSwal(text.cart.tryAgain);
  };

  const handleSuccess = () => {
    setLoading(false);
    MySwal.close();
    showSuccessSwal(text.cart.success);
  };

  return { loading, setLoading, handleError, handleSuccess };
};
