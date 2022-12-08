import keycloak from "keycloak-js";
import { store } from "../state/store";
import { login, logout } from "../state/session.slice";
import { LOCATION_STORE_KEY } from "../state/location.slice";

const keycloakService = new keycloak({
  url: "https://auth.gyfted.io/",
  realm: "certification",
  clientId: "bookstore-client",
});

export const initKeycloak = () => {
  keycloakService.init({
    onLoad: "check-sso",
    redirectUri:
      window.location.origin +
      (store.getState()[LOCATION_STORE_KEY].location || "/"),
    checkLoginIframe: false,
  });
};

export const loginKeycloak = () => {
  keycloakService.login();
};

export const logoutKeycloak = () => {
  keycloakService.logout({ redirectUri: window.location.origin + "/" });
};

keycloakService.onAuthSuccess = () => {
  store.dispatch(
    login({
      token: `${keycloakService.token}`,
      refreshToken: `${keycloakService.refreshToken}`,
      userId: `${keycloakService.subject}`,
    })
  );
};

keycloakService.onReady = (authenticated) => {
  if (!authenticated) {
    store.dispatch(logout());
  }
};

export default keycloakService;
