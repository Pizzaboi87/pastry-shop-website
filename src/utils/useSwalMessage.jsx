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

  const showQuestionSwal = useCallback(async (question) => {
    const result = await Swal.fire({
      title: text.swal.questionTitle,
      text: question,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: text.swal.confirm,
      cancelButtonText: text.swal.cancel,
    });

    return result;
  }, []);

  return { showErrorSwal, showSuccessSwal, showQuestionSwal };
};
