import { useGetCartQuery } from "../../state/api-cart";

function UserCart() {
  const { data } = useGetCartQuery({});
  console.log(data);
  return null;
}

export default UserCart;
