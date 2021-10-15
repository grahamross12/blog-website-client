import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="navbar-button"
      onClick={() =>
        loginWithRedirect({ redirectUri: process.env.REACT_APP_CLIENT_DOMAIN })
      }
    >
      Log in
    </button>
  );
}

export default LoginButton;
