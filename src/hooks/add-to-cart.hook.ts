import { usePostCartItemMutation } from "../state/api-cart";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  book: {
    isbn13: string;
    title: string;
    subtitle: string;
    price: string;
    image: string;
  };
};
function useAddToCart({ book }: Inputs) {
  const [quantity, setQuantity] = useState(1);
  const [postCartItem, { isLoading, isError }] = usePostCartItemMutation();

  const submit = () => {
    toast
      .promise(
        postCartItem({
          product: book.isbn13,
          title: book.title,
          subtitle: book.subtitle ? book.subtitle : undefined,
          price: Number(book.price.replace("$", "")),
          image: book.image ? book.image : undefined,
          qty: quantity,
        }).unwrap(),
        {
          pending: "Processing request",
          success: "Done",
          error: "We couldn't process the request",
        }
      )
      .then(() => setQuantity(0));
  };

  const riseQuantity = () => {
    setQuantity((prevState) => ++prevState);
  };
  const lowQuantity = () => {
    setQuantity((prevState) => {
      if (prevState > 1) {
        return --prevState;
      }
      return 1;
    });
  };

  const updateQuantity = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
  };

  return {
    submit,
    riseQuantity,
    lowQuantity,
    updateQuantity,
    quantity,
    isLoading,
    isError,
  };
}

export default useAddToCart;
