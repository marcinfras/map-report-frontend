import { Map } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1636821771168-d13e578a88ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
        alt="City Map Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: "brightness(0.45)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: 40, md: 56 },
              lineHeight: 1.2,
            }}
          >
            MapReport
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
              maxWidth: "700px",
              mx: "auto",
              fontSize: { xs: 18, md: 22 },
            }}
          >
            Report and track city issues directly on an interactive map. Help
            make your community better with collaborative problem-solving.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<Map />}
            onClick={() => navigate("/map")}
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            Go to Map
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};
