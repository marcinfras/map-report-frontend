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
import { PinType } from "@marcinfras/map-report-server/types";

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
          value={PinType.Damage}
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
          value={PinType.Change}
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
          value={PinType.Idea}
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
