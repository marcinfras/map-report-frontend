import { CloudUpload } from "@mui/icons-material";
import { Box, FormLabel, Typography } from "@mui/material";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import type { ProfileFormData } from "../profileSchemas";

export const AvatarInputField = ({
  field,
  error,
}: {
  field: ControllerRenderProps<ProfileFormData, "avatar">;
  error: FieldError | undefined;
}) => {
  return (
    <Box>
      <FormLabel>Profile Photo</FormLabel>
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
        onClick={() => document.getElementById("avatar-upload")?.click()}
      >
        <input
          type="file"
          accept="image/*"
          id="avatar-upload"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              field.onChange(file);
            }
          }}
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
