import { useEffect } from "react";
import { logoutKeycloak } from "../../services/keycloak.service";
import { useAppDispatch } from "../../state/hooks";
import { changeLocation } from "../../state/location.slice";

function LogoutControl() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeLocation(""));
    logoutKeycloak();
  }, [dispatch]);

  return null;
}

export default LogoutControl;
