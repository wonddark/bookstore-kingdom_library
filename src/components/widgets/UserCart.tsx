import { useGetCartQuery } from "../../state/api-cart";

function UserCart() {
  const { data } = useGetCartQuery({});
  return null;
}

export default UserCart;
