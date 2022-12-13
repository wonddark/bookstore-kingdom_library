import keycloak from "keycloak-js";
import { store } from "../state/store";
import { login, logout, toggleAuthenticating } from "../state/session.slice";
import jwtDecoder from "jwt-decode";

const keycloakService = new keycloak({
  url: "https://auth.gyfted.io/",
  realm: "certification",
  clientId: "bookstore-client",
});

export const initKeycloak = () => {
  store.dispatch(toggleAuthenticating());
  keycloakService
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: window.location.origin + "/",
      checkLoginIframe: false,
    })
    .then(() => store.dispatch(toggleAuthenticating()));
};

export const loginKeycloak = () => {
  keycloakService.login();
};

export const logoutKeycloak = () => {
  keycloakService.logout({ redirectUri: window.location.origin + "/" });
};

keycloakService.onAuthSuccess = () => {
  const { preferred_username, picture, name, given_name, family_name, email } =
    jwtDecoder(`${keycloakService.token}`) as {
      preferred_username: string;
      picture: string | undefined;
      name: string;
      given_name: string;
      family_name: string;
      email: string;
    };

  store.dispatch(
    login({
      token: `${keycloakService.token}`,
      refreshToken: `${keycloakService.refreshToken}`,
      userId: `${keycloakService.subject}`,
      preferred_username,
      picture,
      name,
      given_name,
      family_name,
      email,
    })
  );
};

keycloakService.onReady = (authenticated) => {
  if (!authenticated) {
    store.dispatch(logout());
  }
};

export default keycloakService;
