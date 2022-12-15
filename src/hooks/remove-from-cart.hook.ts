import { useDeleteCartItemMutation } from "../state/api-cart";
import { toast } from "react-toastify";

type Inputs = { product: string };
function useRemoveFromCart({ product }: Inputs) {
  const [removeFromCart, { isLoading, isError }] = useDeleteCartItemMutation();

  const submit = () => {
    toast
      .promise(removeFromCart(product).unwrap(), {
        pending: "Processing",
        success: "Product deleted form basket",
        error: "We couldn't process the request",
      })
      .finally();
  };
  return { submit, isLoading, isError };
}

export default useRemoveFromCart;
