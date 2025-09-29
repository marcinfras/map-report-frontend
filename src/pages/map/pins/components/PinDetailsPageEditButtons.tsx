import { Box, Button } from "@mui/material";
import { usePinsStore, type PinDetails } from "../../../../store/pinsStore";
import { usePinMutations } from "../../../../hooks/usePinMutations";

export const PinDetailsPageEditButtons = ({ pin }: { pin: PinDetails }) => {
  const { setIsDeletePinDialogOpen, setIsAddPinModalOpen } = usePinsStore();
  const { updateMutate } = usePinMutations();

  const onUpdate = () => {
    if (!pin.status || !pin.id) return;

    const formData = new FormData();
    const status = pin.status === "active" ? "resolved" : "active";

    formData.append("status", status);

    updateMutate.mutate({
      id: pin.id,
      data: formData,
    });
  };

  return (
    <Box
      mt={4}
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddPinModalOpen(true)}
      >
        Edit Pin
      </Button>

      <Button
        variant="outlined"
        color={pin.status === "active" ? "success" : "warning"}
        onClick={onUpdate}
        disabled={updateMutate.isPending}
      >
        {pin.status === "active" ? "Mark as Resolved" : "Mark as Active"}
      </Button>

      <Button
        variant="outlined"
        color="error"
        onClick={() => setIsDeletePinDialogOpen(true)}
      >
        Delete Pin
      </Button>
    </Box>
  );
};
