import { useEffect } from "react";
import { loginKeycloak } from "../../services/keycloak.service";

function Authentication() {
  useEffect(() => {
    loginKeycloak();
  }, []);
  return null;
}

export default Authentication;
