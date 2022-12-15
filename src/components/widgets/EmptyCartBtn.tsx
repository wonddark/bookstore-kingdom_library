import { usePostCartMutation } from "../../state/api-cart";
import { toast } from "react-toastify";

function EmptyCartBtn() {
  const [postCart] = usePostCartMutation();
  const emptyCart = () => {
    toast
      .promise(postCart({}).unwrap(), {
        pending: "Procesando",
        error: "No pudimos completar la operación",
        success: "Listo",
      })
      .finally();
  };
  return (
    <button className="btn btn-danger" onClick={emptyCart}>
      <i className="bi bi-trash me-2" />
      Vaciar la cesta
    </button>
  );
}

export default EmptyCartBtn;
