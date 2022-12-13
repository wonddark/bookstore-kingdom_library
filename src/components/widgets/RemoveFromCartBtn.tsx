import useRemoveFromCart from "../../hooks/remove-from-cart.hook";

function RemoveFromCartBtn({ bookId }: { bookId: string }) {
  const { submit, isLoading } = useRemoveFromCart({ product: bookId });
  return (
    <button
      className="btn btn-outline-danger btn-sm"
      disabled={isLoading}
      onClick={submit}
    >
      <i className="bi bi-trash" />
    </button>
  );
}

export default RemoveFromCartBtn;
