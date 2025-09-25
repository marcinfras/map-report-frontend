import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Build, Lightbulb, ReportProblem } from "@mui/icons-material";
import { usePinsStore } from "../../../store/pinsStore";
import { useSelectedPinId } from "../../../hooks/useSelectedPinId";
import { useQuery } from "@tanstack/react-query";
import { getPinById } from "../actions";
import { useSnackbarStore } from "../../../store/snackbarStore";
import { useEffect } from "react";
import { formatDate } from "../../../helpers/helpers";

const getTypeConfig = (type: string) => {
  const configs = {
    damage: {
      color: "error",
      label: "Damage Report",
      icon: <ReportProblem />,
    },
    change: { color: "warning", label: "Change Request", icon: <Build /> },
    idea: { color: "success", label: "Community Idea", icon: <Lightbulb /> },
  };
  return configs[type as keyof typeof configs] || configs.damage;
};

export const PinDetailsModal = () => {
  const { pinDetailsModalOpen, setIsPinDetailsModalOpen } = usePinsStore();
  const { show } = useSnackbarStore();
  const { selectedPinId, setSelectedPinId } = useSelectedPinId();

  const {
    data: pin,
    error,
    isPending,
  } = useQuery({
    queryKey: ["pin", selectedPinId],
    queryFn: () => getPinById(selectedPinId!),
    enabled: !!selectedPinId,
  });

  const onClose = () => {
    setIsPinDetailsModalOpen(false);
    setSelectedPinId(null);
  };

  useEffect(() => {
    if (selectedPinId) {
      setIsPinDetailsModalOpen(true);
    }

    if (error) {
      setIsPinDetailsModalOpen(false);
      setSelectedPinId(null);
      show("Error", error.message, "error");
    }
  }, [selectedPinId, setIsPinDetailsModalOpen, error, show]);

  if (!selectedPinId) return null;

  return (
    <Dialog
      open={pinDetailsModalOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      {isPending && !pin && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      )}
      {pin && !isPending && (
        <>
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                label={getTypeConfig(pin.type).label}
                size="small"
                color={
                  getTypeConfig(pin.type).color as
                    | "error"
                    | "warning"
                    | "success"
                }
                icon={getTypeConfig(pin.type).icon}
              />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h5" component="h3">
                {pin.title}
              </Typography>
              {pin.image && (
                <Box
                  sx={{
                    width: "100%",
                    height: 250,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pin.image}
                    alt={pin.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
              <Typography variant="body1" color="text.secondary">
                {pin.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: 2,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Reported by {pin.author.fullName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Reported on {formatDate(pin.createdAt)}
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button variant="outlined" fullWidth onClick={onClose}>
              Close
            </Button>
            <Button variant="contained" fullWidth>
              Details
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
