import { handleToast } from "./helper";

const handleError = (err) => {
  // console.log(err,"error");
  if (err && err.result) {
    // if (err.result.status === 500 || err.result.status === 502) {
    //   toastError("It's not you, it's us. Please try again after some time");
    // } else if (err.result.status === 304) {
    //   toastError("Sorry, you can only reset your passcode once.");
    // } else {
    const error =
      err.result.responseDescription ||
      err.result.data?.data?.message ||
      err.result.data?.message ||
      (err.result.data?.data && err.result.data.data?.resultMessage);
    handleToast(error, "error");
    // }
  } else if (err.responseCode == "06") {
    handleToast(err.responseDescription, "error");
  } else if (err.responseDescription) {
    handleToast(err.responseDescription, "error");
  }
};

export default handleError;
