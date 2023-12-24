import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
    />
  );
};

export default SuccessToast;
