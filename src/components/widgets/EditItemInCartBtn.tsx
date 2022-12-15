import { usePostCartItemMutation } from "../../state/api-cart";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import { ChangeEvent, useState } from "react";

type Props = {
  bookId: string;
  title: string;
  price: number;
  currentQuantity: number;
  subtitle?: string;
  image?: string;
};
function EditItemInCartBtn({
  bookId,
  title,
  price,
  currentQuantity,
  subtitle,
  image,
}: Props) {
  const [quantity, setQuantity] = useState(currentQuantity);
  const updateQuantity = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [postItemCart, { isLoading }] = usePostCartItemMutation();
  const submit = () => {
    toast
      .promise(
        postItemCart({
          product: bookId,
          title,
          price,
          qty: quantity,
          subtitle,
          image,
        }).unwrap(),
        {
          pending: "Procesando",
          success: "Hecho!",
          error: "No pudimos procesar la petición",
        }
      )
      .then(() => toggle());
  };
  return (
    <>
      <button
        className="btn btn-outline-info btn-sm"
        disabled={isLoading}
        onClick={toggle}
        title="Editar cantidad de artículos"
      >
        <i className="bi bi-pencil-square" />
      </button>
      {
        <Modal isOpen={isOpen} toggle={toggle} size="sm" centered>
          <div className="modal-body">
            <div className="mb-2">
              <label htmlFor="new_quantity">Nueva cantidad</label>
              <input
                id="new_quantity"
                type="number"
                value={quantity}
                onChange={updateQuantity}
                className="form-control"
              />
            </div>
            <div className="text-end">
              <button onClick={toggle} className="btn btn-light me-2">
                <i className="bi bi-x me-2" />
                Cancelar
              </button>
              <button onClick={submit} className="btn btn-primary">
                <i className="bi bi-check me-2" />
                Actualizar
              </button>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}

export default EditItemInCartBtn;
