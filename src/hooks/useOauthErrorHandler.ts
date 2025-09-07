import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSnackbarStore } from "../store/snackbarStore";

enum OAuthError {
  CANCELLED = "oauth_cancelled",
  FAILED = "oauth_failed",
  ACCOUNT_EXISTS = "oauth_account_exists",
}

const getOAuthErrorMessage = (error: string): string => {
  switch (error) {
    case OAuthError.CANCELLED:
      return "Google login was cancelled. Please try again.";
    case OAuthError.FAILED:
      return "Google login failed. Please try again.";
    case OAuthError.ACCOUNT_EXISTS:
      return "This email is already registered with a different sign-in method. Please use standard login.";
    default:
      return "Authentication failed. Please try again.";
  }
};

export const useOauthErrorHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { show } = useSnackbarStore();

  useEffect(() => {
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (error) {
      const message = getOAuthErrorMessage(error);

      show("Authentication Error", message, "error");

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("error");
      setSearchParams(newSearchParams, { replace: true });
    }

    if (success === "success") {
      show("Login Successful", "You have logged in successfully", "success");

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("success");
      setSearchParams(newSearchParams, { replace: true });

      navigate("/", { replace: true });
    }
  }, [searchParams, show, navigate, setSearchParams]);
};
