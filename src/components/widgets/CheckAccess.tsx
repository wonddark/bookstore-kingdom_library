import { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { SESSION_STORE_KEY } from "../../state/session.slice";

type Props = { children: ReactElement };
function CheckAccess({ children }: Props) {
  const { userId } = useParams();
  const storedId = useAppSelector((state) => state[SESSION_STORE_KEY].userId);
  return (
    <>
      {storedId === userId ? (
        children
      ) : (
        <div className="container my-3 py-2 text-center">
          <p className="display-5 text-danger">
            You are not allowed to be here
          </p>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <p className="lead mt-3">
                You seems to be accidentally out of place. Please{" "}
                <Link to="/">go back home</Link> and keep diving into our great
                collection of technical books. If this error occurs to you once
                again be kind and report it to us, we'll do our best to solve it
                as soon as possible
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckAccess;
