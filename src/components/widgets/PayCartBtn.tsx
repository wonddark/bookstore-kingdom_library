import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { selectUserId } from "../../state/session.slice";

function PayCartBtn() {
  const state = useAppSelector((state) => state);
  const userId = selectUserId(state);
  const navigate = useNavigate();
  const payNow = () => {
    navigate(`/checkout/${userId}`);
  };
  return (
    <button className="btn btn-success" onClick={payNow}>
      <i className="bi bi-credit-card me-2" />
      Pagar con tarjeta
    </button>
  );
}

export default PayCartBtn;
