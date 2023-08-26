import Swal from "sweetalert2";

export const errorSwal = (error, text) => {
  Swal.fire({
    icon: "error",
    title: text.swal.errorTitle,
    text: error,
  });
};
