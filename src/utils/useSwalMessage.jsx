import Swal from "sweetalert2";
import { useCallback, useContext } from "react";
import { UserContext } from "../context";

export const useSwalMessage = () => {
  const { text } = useContext(UserContext);

  const showErrorSwal = useCallback(
    (error) => {
      return new Promise((resolve) => {
        Swal.fire({
          icon: "error",
          title: text.swal.errorTitle,
          text: error,
        }).then((result) => {
          resolve(result);
        });
      });
    },
    [text.swal.errorTitle]
  );

  const showSuccessSwal = useCallback(
    (message) => {
      return new Promise((resolve) => {
        Swal.fire({
          icon: "success",
          title: text.swal.successTitle,
          text: message,
        }).then((result) => {
          resolve(result);
        });
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
