import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import keycloakService from "./services/keycloak.service";
import { login } from "./state/session.slice";

const container = document.getElementById("root")!;
const root = createRoot(container);

keycloakService
  .init({
    onLoad: "login-required",
    silentCheckSsoRedirectUri: window.location.origin + "/",
  })
  .then((authenticated) => {
    if (authenticated) {
      store.dispatch(
        login({
          token: `${keycloakService.token}`,
          refreshToken: `${keycloakService.refreshToken}`,
        })
      );
    }
  });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
