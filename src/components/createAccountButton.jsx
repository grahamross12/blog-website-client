import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function CreateAccountButton() {
  const { loginWithRedirect } = useAuth0();

  async function createAccount() {
    await loginWithRedirect({
      screen_hint: "signup",
      redirectUri: "http://localhost:3000/callback",
    });
  }
  return (
    <button
      className="navbar-button-fill"
      id="create-account-button"
      onClick={() => createAccount()}
    >
      Create account
    </button>
  );
}

export default CreateAccountButton;
