import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { selectUserEmail, selectUserId } from "../../state/session.slice";
import { useLazyGetCartQuery } from "../../state/api-cart";
import { Link, useParams } from "react-router-dom";
import { usePostCartMutation } from "../../state/api-cart";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { userId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const state = useAppSelector((state) => state);
  const userEmail = selectUserEmail(state);
  const storedUserId = selectUserId(state);
  const [getCart, { data, isLoading }] = useLazyGetCartQuery({});
  let total = 0;

  const accessGranted = userId === storedUserId;

  useEffect(() => {
    if (accessGranted) {
      getCart({});
    }
  }, [accessGranted, getCart]);

  const metadata = {};
  data &&
    data.products.forEach((item: any) => {
      Object.assign(metadata, {
        [`product_${item.product}_qty`]: item.qty,
        [`product_${item.product}_subtotal`]:
          Number(item.price) * Number(item.qty),
      });
    });

  const [postCart] = usePostCartMutation();

  const [showThanks, setShowThanks] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const toggleShowThanks = () => {
    setShowThanks((prevState) => !prevState);
  };
  const thanksPayment = () => {
    toggleShowThanks();
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !stripe) {
      return;
    }

    const card = elements?.getElement(CardElement);

    if (card) {
      toast
        .promise(
          stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {
              email: userEmail,
            },
            metadata,
          }),
          {
            pending: "Payment processing",
            success: "Payment successful",
            error: "We couldn't process your payment",
          }
        )
        .then((res) => {
          setPaymentId(`${res.paymentMethod?.id}`);
          thanksPayment();
          postCart({});
        })
        .catch();
    } else {
      return;
    }
  };

  return (
    <div className="container my-3">
      {!showThanks ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              {!isLoading &&
                data &&
                data.products.map((item: any) => {
                  const subtotal = Number(item.price) * Number(item.qty);
                  total = total + subtotal;
                  return (
                    <div key={item.product} className="card card-body my-2">
                      <div className="container text-start">
                        <div className="row">
                          <div className="col-9">
                            <p className="fs-5 display-1 mb-1">{item.title}</p>
                          </div>
                          <div className="col text-end">
                            {item.qty} artículos
                          </div>
                          <div className="col text-end">
                            ${subtotal.toLocaleString("es-ES")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="text-start fw-bold text-primary ps-2">
                A pagar: ${total.toLocaleString("es-ES")}
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={userEmail}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "18px",
                        fontWeight: 400,
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                        backgroundColor: "#fff",
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-end">
            <button type="reset" disabled={!stripe} className="btn me-2">
              <i className="bi bi-x me-2" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={!stripe}
              className="btn btn-primary"
            >
              <i className="bi bi-check me-2" /> Aceptar
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="display-1 fs-3 mb-3">¡Gracias por tu compra!</p>
          <p>
            El pago se ha completado satisfactoriamente. Por favor guarda este
            id de referencia <strong>{paymentId}</strong>
          </p>
          <Link to="/" className="btn btn-primary mt-2">
            <i className="bi bi-arrow-left me-2" /> Volver
          </Link>
        </div>
      )}
    </div>
  );
};

const stripePromise = loadStripe(
  "pk_test_51HvnNeL30FHPDItuIKCjXY5WvLhj3LpF8hINA05zGAQr5eBfJBjB853s0YIF8Q4qXTRcc3yzDR84nDrQGySudPq50041BZ5aU9"
);

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
