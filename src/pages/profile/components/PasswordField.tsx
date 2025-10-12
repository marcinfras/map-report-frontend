import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import type {
  ControllerRenderProps,
  FieldError,
  FieldPath,
} from "react-hook-form";
import type { PasswordFormData } from "../profileSchemas";

export const PasswordField = <T extends FieldPath<PasswordFormData>>({
  field,
  error,
  label,
}: {
  field: ControllerRenderProps<PasswordFormData, T>;
  error: FieldError | undefined;
  label: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...field}
      label={label}
      fullWidth
      margin="normal"
      type={showPassword ? "text" : "password"}
      error={!!error}
      helperText={error?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
