import { useLazyGetCartQuery } from "../../state/api-cart";
import { useEffect } from "react";
import { useAppSelector } from "../../state/hooks";
import { selectAuthenticating, selectUserId } from "../../state/session.slice";
import { useParams } from "react-router-dom";
import RemoveFromCartBtn from "./RemoveFromCartBtn";
import PayCartBtn from "./PayCartBtn";

function UserCart() {
  const { userId } = useParams();
  const state = useAppSelector((state) => state);
  const authenticating = selectAuthenticating(state);
  const storedUserId = selectUserId(state);
  const [getCart, { data, isLoading }] = useLazyGetCartQuery({});
  let total = 0;

  const accessGranted = userId === storedUserId;

  useEffect(() => {
    if (accessGranted && !authenticating) {
      getCart({});
    }
  }, [authenticating, accessGranted, getCart]);
  return (
    <div className="container mt-3">
      {accessGranted ? (
        <>
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
                        <div className="col col-6">Título / Subtítulo</div>
                        <div className="col text-end">Precio</div>
                        <div className="col text-end">Cantidad</div>
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
                            <div className="col col-6">
                              <p className="fs-5 display-1 mb-1">
                                {item.title}
                              </p>
                              <small className="d-block fst-italic">
                                {item.subtitle}
                              </small>
                            </div>
                            <div className="col text-end">
                              ${Number(item.price).toLocaleString("es-ES")}
                            </div>
                            <div className="col text-end">{item.qty}</div>
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
                        <div className="col-10">Total</div>
                        <div className="col">
                          ${total.toLocaleString("es-ES")}
                        </div>
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
        </>
      ) : (
        <p className="display-5 text-center text-danger mt-5">
          No tienes permiso para estar aquí
        </p>
      )}
    </div>
  );
}

export default UserCart;
