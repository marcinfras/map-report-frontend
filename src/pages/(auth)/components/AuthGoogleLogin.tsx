import { Google } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";

export const AuthGoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Box mt={4}>
      <Divider>
        <Typography variant="body2" color="textSecondary">
          Or continue with
        </Typography>
      </Divider>

      <Box mt={3}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          sx={{ textTransform: "none" }}
          onClick={handleGoogleLogin}
        >
          Google
        </Button>
      </Box>
    </Box>
  );
};
