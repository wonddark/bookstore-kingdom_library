function AddToCartBtn({ bookId }: { bookId: string }) {
  return (
    <button className="btn btn-primary">
      <i className="bi bi-cart-plus me-2" /> Poner en la cesta
    </button>
  );
}

export default AddToCartBtn;
