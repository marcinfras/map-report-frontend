import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { passwordSchema, type PasswordFormData } from "../profileSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordField } from "./PasswordField";
import { useProfileMutations } from "@hooks/useProfileMutations";

export const ChangePasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    changePasswordMutate: { mutate, isPending },
  } = useProfileMutations(() => reset());

  const onSubmitPassword = handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <Box component="form" onSubmit={onSubmitPassword}>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                field={field}
                error={errors.currentPassword}
                label="Current Password"
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                field={field}
                error={errors.newPassword}
                label="New Password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                field={field}
                error={errors.confirmPassword}
                label="Confirm New Password"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
