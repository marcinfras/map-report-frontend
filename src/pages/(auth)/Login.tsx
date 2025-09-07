import { Email, Lock } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "./authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInput } from "./components/AuthInput";
import { AuthButton } from "./components/AuthButton";
import { useOauthErrorHandler } from "../../hooks/useOauthErrorHandler";
import { useAuth } from "../../hooks/useAuth";

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

  useOauthErrorHandler();

  const { login, isLoggingIn } = useAuth();

  const onSubmit = handleSubmit((data) => {
    login(data);
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
      <AuthButton isSubmitting={isLoggingIn} text="Sign In" />
    </Box>
  );
};
