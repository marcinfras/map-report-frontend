import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
import type { LoginFormValues, RegisterFormValues } from "../authSchema";

type AuthInputProps = Omit<TextFieldProps, "name" | "defaultValue"> & {
  name: "email" | "password" | "fullName" | "confirmPassword";
  control: Control<LoginFormValues | RegisterFormValues>;
  label: string;
};

export const AuthInput = ({
  name,
  control,
  label,
  type = "text",
  InputProps,
  ...rest
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          margin="normal"
          label={label}
          type={isPassword && showPassword ? "text" : type}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            ...InputProps,
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : (
              InputProps?.endAdornment
            ),
          }}
          {...rest}
        />
      )}
    />
  );
};
