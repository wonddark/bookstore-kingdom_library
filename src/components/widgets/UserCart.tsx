import { useGetCartQuery } from "../../state/api-cart";
import RemoveFromCartBtn from "./RemoveFromCartBtn";
import PayCartBtn from "./PayCartBtn";

function UserCart() {
  const { data, isLoading } = useGetCartQuery({});
  let total = 0;
  return (
    <div className="container mt-3">
      {!isLoading && data ? (
        <div className="row flex-column">
          <div className="col">
            <h2 className="d-inline-block">Tu cesta</h2>
            <div className="float-end clearfix">
              <span className="d-block py-2 px-4 bg-primary text-light rounded-pill text-center mb-1">
                {data.status.toUpperCase()}
              </span>
              <small className="text-muted">
                {new Date(data.updated).toLocaleString()}
              </small>
            </div>
            <p className="lead mt-5 mt-md-3 mt-lg-2">
              {data.products.length > 0
                ? `Tienes ${data.products.length} productos en la cesta`
                : "No hay productos en tu cesta"}
            </p>
          </div>
          {data.products.length > 0 ? (
            <div className="col">
              <div className="card card-body">
                <div className="container">
                  <div className="row fw-bold">
                    <div className="col">Imagen</div>
                    <div className="col col-6 d-none d-md-block">
                      Título / Subtítulo
                    </div>
                    <div className="col text-end d-none d-md-block">Precio</div>
                    <div className="col text-end d-none d-lg-block">
                      Cantidad
                    </div>
                    <div className="col text-end">Subtotal</div>
                    <div className="col"></div>
                  </div>
                </div>
              </div>
              {data.products.map((item: any) => {
                const subtotal = Number(item.price) * Number(item.qty);
                total = total + subtotal;
                return (
                  <div key={item.product} className="card card-body my-2">
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="product thumbnail"
                          />
                        </div>
                        <div className="col col-6 d-none d-md-block">
                          <p className="fs-5 display-1 mb-1">{item.title}</p>
                          <small className="d-block fst-italic">
                            {item.subtitle}
                          </small>
                        </div>
                        <div className="col text-end d-none d-md-block">
                          ${Number(item.price).toLocaleString("es-ES")}
                        </div>
                        <div className="col text-end d-none d-lg-block">
                          {item.qty}
                        </div>
                        <div className="col text-end">
                          ${subtotal.toLocaleString("es-ES")}
                        </div>
                        <div className="col text-center">
                          <RemoveFromCartBtn bookId={item.product} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="card card-body mb-2">
                <div className="container">
                  <div className="row fw-bold">
                    <div className="col-8 col-md-10">Total</div>
                    <div className="col">${total.toLocaleString("es-ES")}</div>
                  </div>
                </div>
              </div>
              <div className="my-3 text-end">
                <PayCartBtn />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <>Cargando datos</>
      )}
    </div>
  );
}

export default UserCart;
