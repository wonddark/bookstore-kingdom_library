import { usePostCartItemMutation } from "../state/api-cart";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

function useAddToCart({
  book,
}: {
  book: {
    isbn13: string;
    title: string;
    subtitle: string;
    price: string;
    image: string;
  };
}) {
  const [quantity, setQuantity] = useState(1);
  const [postCartItem, { isLoading, isError }] = usePostCartItemMutation();

  const submit = () => {
    toast
      .promise(
        postCartItem({
          product: book.isbn13,
          title: book.title,
          subtitle: book.subtitle,
          price: Number(book.price.replace("$", "")),
          image: book.image,
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
