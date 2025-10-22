import { Alert, Box } from "@mui/material";
import { useAuth } from "@hooks/useAuth";
import { ProfilePageHeader } from "./components/ProfilePageHeader";
import { EditProfileForm } from "./components/EditProfileForm";
import { Loader } from "@components/Loader";
import { ChangePasswordForm } from "./components/ChangePasswordForm";

export const ProfilePage = () => {
  const { user, logout, isRefetching } = useAuth();

  if (isRefetching) {
    return <Loader />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, mb: 8, p: 2 }}>
      <ProfilePageHeader user={user!} logout={logout} />
      <EditProfileForm user={user!} />
      {user?.userType === "standard" && <ChangePasswordForm />}

      {user?.userType === "thirdParty" && (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          You are signed in with Google. Password management is handled by
          Google.
        </Alert>
      )}
    </Box>
  );
};
