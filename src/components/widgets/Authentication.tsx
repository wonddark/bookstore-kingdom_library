import { useEffect } from "react";
import { logoutKeycloak } from "../../services/keycloak.service";

function Authentication() {
  useEffect(() => {
    logoutKeycloak();
  }, []);
  return null;
}

export default Authentication;
