import useAddToCart from "../../hooks/add-to-cart.hook";

function AddToCartBtn({ book }: { book: any }) {
  const { submit, riseQuantity, lowQuantity, updateQuantity, quantity } =
    useAddToCart({
      book,
    });
  return (
    <div className="row justify-content-start align-items-center">
      <div
        className="col-12 col-sm-auto mb-1"
        style={{ maxWidth: "fit-content" }}
      >
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
            style={{ minWidth: "55px", maxWidth: "55px", textAlign: "right" }}
          />
          <button
            className="btn btn-light input-group-text"
            onClick={lowQuantity}
            disabled={quantity === 1}
          >
            <i className="bi bi-dash" />1
          </button>
        </div>
      </div>
      <div className="col mb-1">
        <button className="btn btn-primary text-nowrap" onClick={submit}>
          <i className="bi bi-cart-plus" /> Poner en la cesta
        </button>
      </div>
    </div>
  );
}

export default AddToCartBtn;
