import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "./authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, InputAdornment } from "@mui/material";
import { AuthInput } from "./components/AuthInput";
import { Email, Lock, Person } from "@mui/icons-material";
import { useState } from "react";
import { AuthButton } from "./components/AuthButton";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form Data:", data);

    setIsSubmitting(true);

    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const newUser = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Register failed:", errorData);
      setIsSubmitting(false);
      return;
    }

    const resData = await res.json();

    console.log("Register successful:", resData);
    setIsSubmitting(false);
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

      <AuthButton isSubmitting={isSubmitting} text="Create Account" />
    </Box>
  );
};
