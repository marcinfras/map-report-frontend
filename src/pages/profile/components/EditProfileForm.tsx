import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { User } from "../../../hooks/useAuth";
import { profileSchema, type ProfileFormData } from "../profileSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { AvatarInputField } from "./AvatarInputField";
import { useProfileMutations } from "../../../hooks/useProfileMutations";

export const EditProfileForm = ({ user }: { user: User }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: user?.profile.fullName || "",
      avatar: undefined,
    },
  });

  const {
    updateMutate: { mutate, isPending },
  } = useProfileMutations();

  const onSubmitProfile = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    mutate(formData);
  });

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>

        <Box component="form" onSubmit={onSubmitProfile}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <AvatarInputField field={field} error={errors.avatar} />
            )}
          />

          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                margin="normal"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2, py: 1.2 }}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
