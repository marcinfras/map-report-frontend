import { Google } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";

export const AuthGoogleLogin = () => {
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
        >
          Google
        </Button>
      </Box>
    </Box>
  );
};
