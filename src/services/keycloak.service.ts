import keycloak from "keycloak-js";

const keycloakService = new keycloak({
  url: "https://auth.gyfted.io/",
  realm: "certification",
  clientId: "bookstore-client",
});

export default keycloakService;
