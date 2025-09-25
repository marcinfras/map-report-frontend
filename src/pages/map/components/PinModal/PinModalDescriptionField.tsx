import type { ControllerRenderProps, FieldError } from "react-hook-form";
import type { PinFormData } from "../../pinSchemas";
import { TextField } from "@mui/material";

export const PinModalDescriptionField = ({
  field,
  error,
}: {
  field: ControllerRenderProps<PinFormData, "description">;
  error: FieldError | undefined;
}) => {
  return (
    <TextField
      {...field}
      fullWidth
      label="Description"
      variant="outlined"
      required
      multiline
      rows={4}
      error={!!error}
      helperText={error?.message}
    />
  );
};
