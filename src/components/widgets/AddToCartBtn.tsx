import useAddToCart from "../../hooks/add-to-cart.hook";

function AddToCartBtn({ book }: { book: any }) {
  const { submit, riseQuantity, lowQuantity, updateQuantity, quantity } =
    useAddToCart({
      book,
    });
  return (
    <div className="w-75 mx-auto">
      <div className="input-group">
        <button
          className="btn btn-light input-group-text"
          onClick={riseQuantity}
        >
          <i className="bi bi-plus" />1
        </button>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={updateQuantity}
        />
        <button
          className="btn btn-light input-group-text"
          onClick={lowQuantity}
          disabled={quantity === 1}
        >
          <i className="bi bi-dash" />1
        </button>
      </div>
      <button className="btn btn-primary mt-1" onClick={submit}>
        <i className="bi bi-cart-plus" /> Poner en la cesta
      </button>
    </div>
  );
}

export default AddToCartBtn;
