import type { ControllerRenderProps, FieldError } from "react-hook-form";
import type { PinFormData } from "../../pinSchemas";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { PinFormType } from "../../pinSchemas";

export const PinModalTypeField = ({
  field,
  error,
}: {
  field: ControllerRenderProps<PinFormData, "type">;
  error: FieldError | undefined;
}) => {
  return (
    <FormControl component="fieldset" error={!!error}>
      <FormLabel component="legend">Type *</FormLabel>
      <RadioGroup {...field} row sx={{ mt: 1 }}>
        <FormControlLabel
          value={PinFormType.Damage}
          control={
            <Radio
              sx={{
                color: "error.main",
                "&.Mui-checked": { color: "error.main" },
              }}
            />
          }
          label="Damage"
        />
        <FormControlLabel
          value={PinFormType.Change}
          control={
            <Radio
              sx={{
                color: "warning.main",
                "&.Mui-checked": { color: "warning.main" },
              }}
            />
          }
          label="Change"
        />
        <FormControlLabel
          value={PinFormType.Idea}
          control={
            <Radio
              sx={{
                color: "success.main",
                "&.Mui-checked": { color: "success.main" },
              }}
            />
          }
          label="Idea"
        />
      </RadioGroup>
      {error && (
        <Typography color="error" variant="caption">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};
