import Swal from "sweetalert2";
import { useCallback, useContext } from "react";
import { UserContext } from "../context";

export const useSwalMessage = () => {
  const { text } = useContext(UserContext);

  const showErrorSwal = useCallback(
    (error) => {
      Swal.fire({
        icon: "error",
        title: text.swal.errorTitle,
        text: error,
      });
    },
    [text.swal.errorTitle]
  );

  const showSuccessSwal = useCallback(
    (message) => {
      Swal.fire({
        icon: "success",
        title: text.swal.successTitle,
        text: message,
      });
    },
    [text.swal.successTitle]
  );

  return { showErrorSwal, showSuccessSwal };
};
