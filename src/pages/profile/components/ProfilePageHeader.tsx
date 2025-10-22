import { Avatar, Button, Stack, Typography } from "@mui/material";
import type { User } from "@hooks/useAuth";
import type { UseMutateFunction } from "@tanstack/react-query";

export const ProfilePageHeader = ({
  user,
  logout,
}: {
  user: User;
  logout: UseMutateFunction<void, Error, void, unknown>;
}) => {
  return (
    <Stack alignItems="center" spacing={1} mb={4}>
      <Avatar
        src={user.profile.avatar || undefined}
        alt={user.profile.fullName}
        sx={{ width: 96, height: 96, mb: 1 }}
      />
      <Typography variant="h5" fontWeight={600}>
        {user?.profile.fullName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user?.email}
      </Typography>

      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{ mt: 1 }}
        onClick={() => logout()}
      >
        Logout
      </Button>
    </Stack>
  );
};
