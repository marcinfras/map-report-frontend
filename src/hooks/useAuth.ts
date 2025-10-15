import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  fetchCurrentUser,
  loginFn,
  logoutFn,
  registerFn,
} from "../pages/(auth)/actions";
import { useSnackbarStore } from "../store/snackbarStore";

export interface User {
  id: string;
  email: string;
  userType: "standard" | "thirdParty";
  profile: {
    id: string;
    fullName: string;
    avatar?: string;
    role: "user" | "admin";
  };
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { show } = useSnackbarStore();

  const {
    data: user,
    isLoading,
    isRefetching,
    isError,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const isAuthenticated = !!user && !isError;

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });

      show("Login Successful", "You have logged in successfully", "success");
      navigate("/map");
    },
    onError: (error) => {
      show("Login Failed", error.message, "error");
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
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

      navigate("/login");
    },
    onError: (error: Error) => {
      show("Logout Failed", error.message, "error");
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    isRefetching,

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
