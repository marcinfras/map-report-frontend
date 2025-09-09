import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "./authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, InputAdornment } from "@mui/material";
import { AuthInput } from "./components/AuthInput";
import { Email, Lock, Person } from "@mui/icons-material";
import { AuthButton } from "./components/AuthButton";
import { useAuth } from "../../hooks/useAuth";

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, isRegistering } = useAuth();

  const onSubmit = handleSubmit((data) => {
    register(data);
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <AuthInput
        name="fullName"
        control={control}
        label="Full Name"
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
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
      <AuthInput
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />

      <AuthButton isSubmitting={isRegistering} text="Create Account" />
    </Box>
  );
};
