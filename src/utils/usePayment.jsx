import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Icon } from "@iconify/react";
import { CartContext, UserContext } from "../context";
import { useContext, useState, useEffect } from "react";
import { useSwalMessage } from "./useSwalMessage";
import { myCartStyle } from "../styles";
import { getUserData, updateUserData } from "./firebase";
import { v4 as uuid } from "uuid";

export const usePayment = () => {
  const { text, userData } = useContext(UserContext);
  const { orderDetails, clearCart } = useContext(CartContext);
  const [actualUserData, setActualUserData] = useState({});
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
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
    if (paymentInProgress || uploadInProgress) {
      MySwal.fire({
        html: <SwalLoader />,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }
  }, [paymentInProgress]);

  const handleConfirm = async () => {
    const result = await showSuccessSwal(text.cart.success);
    if (result && result.isConfirmed) clearCart();
  };

  const handleError = (error) => {
    setPaymentInProgress(false);
    console.log(error);
    MySwal.close();
    showErrorSwal(text.cart.tryAgain);
  };

  const handleSuccess = async () => {
    await uploadOrder();
    if (paymentInProgress) {
      setPaymentInProgress(false);
      MySwal.close();
    }
    handleConfirm();
  };

  const fetchActualData = async () => {
    const userDatafromDB = await getUserData(userData.uid);
    setActualUserData(userDatafromDB);
  };

  useEffect(() => {
    if (userData.uid) {
      fetchActualData();
    }
  }, [uploadInProgress]);

  const uploadOrder = async () => {
    setUploadInProgress(true);
    const updatedOrderDetails = {
      ...orderDetails,
      orderTime: new Date().toLocaleString(),
      orderID: uuid(),
      isDelivered: false,
    };
    if (actualUserData.orders) {
      try {
        await updateUserData(userData.uid, {
          orders: [...actualUserData.orders, updatedOrderDetails],
        });
        setUploadInProgress(false);
      } catch (error) {
        setUploadInProgress(false);
        handleError(error);
      }
    } else {
      try {
        await updateUserData(userData.uid, { orders: [updatedOrderDetails] });
        await fetchActualData();
        setUploadInProgress(false);
      } catch (error) {
        setUploadInProgress(false);
        handleError(error);
      }
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      handleSuccess();
      setPaymentSuccess(null);
    } else if (paymentSuccess === false) {
      handleError();
      setPaymentSuccess(null);
    } else return;
  }, [paymentSuccess]);

  return {
    paymentInProgress,
    setPaymentInProgress,
    setPaymentSuccess,
  };
};
