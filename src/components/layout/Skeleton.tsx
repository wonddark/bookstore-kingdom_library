import { ReactElement } from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

type Props = { children: ReactElement };
function Skeleton({ children }: Props) {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <>{children}</>
      <ToastContainer
        newestOnTop={true}
        draggable={false}
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Skeleton;
