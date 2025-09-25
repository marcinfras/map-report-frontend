import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export const PinModalNotAuth = ({
  addPinModalOpen,
  onCloseModal,
}: {
  addPinModalOpen: boolean;
  onCloseModal: () => void;
}) => {
  return (
    <Dialog
      open={addPinModalOpen}
      onClose={onCloseModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add New Pin</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          You must be logged in to add a new pin.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button variant="outlined" onClick={onCloseModal} fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
