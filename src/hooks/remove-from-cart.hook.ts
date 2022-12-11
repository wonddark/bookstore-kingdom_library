import { useDeleteCartItemMutation } from "../state/api-cart";

function useRemoveFromCart({ product }: { product: string }) {
  const [removeFromCart, { isLoading, isError }] = useDeleteCartItemMutation();

  const submit = () => {
    removeFromCart(product);
  };
  return { submit, isLoading, isError };
}

export default useRemoveFromCart;
