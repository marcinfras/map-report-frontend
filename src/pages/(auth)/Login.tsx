import { Email, Lock } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "./authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInput } from "./components/AuthInput";
import { AuthButton } from "./components/AuthButton";
import { useState } from "react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form Data:", data);
    setIsSubmitting(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("res", res);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Login failed:", errorData);
      setIsSubmitting(false);
      return;
    }

    const resData = await res.json();

    console.log("Login successful:", resData);
    setIsSubmitting(false);
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
      <AuthButton isSubmitting={isSubmitting} text="Sign In" />
    </Box>
  );
};
