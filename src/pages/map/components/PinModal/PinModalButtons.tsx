import { Button, DialogActions } from "@mui/material";

export const PinModalButtons = ({
  onCloseModal,
  isPending,
}: {
  onCloseModal: () => void;
  isPending: boolean;
}) => {
  return (
    <DialogActions sx={{ p: 3, gap: 2 }}>
      <Button variant="outlined" onClick={onCloseModal} fullWidth>
        Cancel
      </Button>
      <Button type="submit" variant="contained" disabled={isPending} fullWidth>
        {isPending ? "Adding..." : "Add Pin"}
      </Button>
    </DialogActions>
  );
};
