import { useGetCartQuery } from "../../state/api-cart";
import { useEffect } from "react";
import { useAppDispatch } from "../../state/hooks";
import { changeLocation } from "../../state/location.slice";
import { useLocation } from "react-router-dom";

function UserCart() {
  const { data } = useGetCartQuery({});
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(changeLocation(pathname));
  });
  return null;
}

export default UserCart;
