import useRemoveFromCart from "../../hooks/remove-from-cart.hook";

type Props = { bookId: string };
function RemoveFromCartBtn({ bookId }: Props) {
  const { submit, isLoading } = useRemoveFromCart({ product: bookId });
  return (
    <button
      className="btn btn-outline-danger btn-sm"
      disabled={isLoading}
      onClick={submit}
      title="Eliminar producto de la cesta"
    >
      <i className="bi bi-trash" />
    </button>
  );
}

export default RemoveFromCartBtn;
