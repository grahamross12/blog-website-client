import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="navbar-button"
      onClick={() =>
        loginWithRedirect({ redirectUri: "http://localhost:3000" })
      }
    >
      Log in
    </button>
  );
}

export default LoginButton;
