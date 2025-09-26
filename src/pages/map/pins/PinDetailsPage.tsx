import {
  Box,
  Chip,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPinById } from "../actions";
import { getTypeConfig } from "../../../helpers/getTypeConfig";
import { formatDate } from "../../../helpers/helpers";
import { useAuth } from "../../../hooks/useAuth";
import { usePinsStore } from "../../../store/pinsStore";
import { PinModal } from "../components/PinModal";

export const PinDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { setIsAddPinModalOpen } = usePinsStore();

  const {
    data: pin,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => getPinById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !pin) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          {error ? (error as Error).message : "Pin not found"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
        gap={1}
        mb={2}
      >
        <Chip
          label={getTypeConfig(pin.type).label}
          color={
            getTypeConfig(pin.type).color as "error" | "warning" | "success"
          }
          icon={getTypeConfig(pin.type).icon}
          size="small"
        />
        <Typography variant="h4" fontWeight="bold">
          {pin.title}
        </Typography>
      </Box>
      {pin.image && (
        <Box
          sx={{
            width: "100%",
            height: 400,
            borderRadius: 2,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <img
            src={pin.image}
            alt={pin.title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      )}

      <Typography variant="body1" color="text.primary" mb={3}>
        {pin.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="body2" color="text.secondary">
          Reported by <strong>{pin.author.fullName}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(pin.createdAt)}
        </Typography>
      </Box>

      {pin.author._id === user?.profile._id && (
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAddPinModalOpen(true)}
          >
            Edit Pin
          </Button>
        </Box>
      )}
      <PinModal
        pinToEdit={{
          id: pin.id,
          title: pin.title,
          description: pin.description,
          type: pin.type,
        }}
      />
    </Box>
  );
};
