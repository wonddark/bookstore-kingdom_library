import { useEffect } from "react";
import { logoutKeycloak } from "../../services/keycloak.service";
import { useAppDispatch } from "../../state/hooks";

function LogoutControl() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    logoutKeycloak();
  }, [dispatch]);

  return null;
}

export default LogoutControl;
