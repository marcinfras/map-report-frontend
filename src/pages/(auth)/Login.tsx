import { Email, Lock } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "./authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInput } from "./components/AuthInput";
import { AuthButton } from "./components/AuthButton";
import { useMutation } from "@tanstack/react-query";
import { loginFn } from "./actions";
import { useNavigate } from "react-router";
import { useSnackbarStore } from "../../store/snackbarStore";

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { show } = useSnackbarStore();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      show("Login Successful", "You have logged in successfully", "success");
      navigate("/");
    },
    onError: (error) => {
      show("Login Failed", error.message, "error");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <AuthInput
        name="email"
        control={control}
        label="Email Address"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <AuthInput
        name="password"
        control={control}
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <AuthButton isSubmitting={isPending} text="Sign In" />
    </Box>
  );
};
