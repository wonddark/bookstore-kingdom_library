import { ReactElement } from "react";
import Navbar from "./Navbar";

function Skeleton({ children }: { children: ReactElement }) {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <>{children}</>
    </div>
  );
}

export default Skeleton;
