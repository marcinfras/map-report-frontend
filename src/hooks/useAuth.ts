import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  fetchCurrentUser,
  loginFn,
  logoutFn,
  registerFn,
} from "../pages/(auth)/actions";
import { useSnackbarStore } from "../store/snackbarStore";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { show } = useSnackbarStore();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });

      show("Login Successful", "You have logged in successfully", "success");
      navigate("/");
    },
    onError: (error) => {
      show("Login Failed", error.message, "error");
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      console.log("Register successful:", data);
      show(
        "Register Successful",
        "Your account has been created. Now you can log in.",
        "success"
      );
      navigate("/login");
    },
    onError: (error) => {
      show("Register Failed", error.message, "error");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.removeQueries({ queryKey: ["auth"] });

      show("Logged out successfully", "You have been logged out.", "success");

      navigate("/");
    },
    onError: (error: Error) => {
      show("Logout Failed", error.message, "error");
    },
  });

  const isAuthenticated = !!user && !isError;

  return {
    user,
    isAuthenticated,
    isLoading,

    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
