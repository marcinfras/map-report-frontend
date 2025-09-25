import type { ControllerRenderProps, FieldError } from "react-hook-form";
import type { PinFormData } from "../../pinSchemas";
import { TextField } from "@mui/material";

export const PinModalTitleField = ({
  field,
  error,
}: {
  field: ControllerRenderProps<PinFormData, "title">;
  error: FieldError | undefined;
}) => {
  return (
    <TextField
      {...field}
      fullWidth
      label="Title"
      variant="outlined"
      required
      error={!!error}
      helperText={error?.message}
    />
  );
};
