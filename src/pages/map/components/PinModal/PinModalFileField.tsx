import type { ControllerRenderProps, FieldError } from "react-hook-form";
import type { PinFormData } from "../../pinSchemas";
import { CloudUpload } from "@mui/icons-material";
import { Box, FormLabel, Typography } from "@mui/material";

export const PinModalFileField = ({
  field,
  error,
}: {
  field: ControllerRenderProps<PinFormData, "file">;
  error: FieldError | undefined;
}) => {
  return (
    <Box>
      <FormLabel>Image (Optional)</FormLabel>
      <Box
        sx={{
          border: "2px dashed #ccc",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          mt: 1,
          "&:hover": { borderColor: "#1976d2" },
        }}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            field.onChange(e.target.files?.[0]);
          }}
          style={{ display: "none" }}
          id="file-upload"
        />
        <CloudUpload sx={{ fontSize: 40, color: "#666", mb: 1 }} />
        <Typography variant="body2" color="textSecondary">
          {field.value ? field.value.name : "Click to upload or drag and drop"}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          PNG, JPG up to 5MB
        </Typography>
        {error && (
          <Typography color="error" variant="caption" display="block">
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
