import { Button, DialogActions } from "@mui/material";

export const PinModalButtons = ({
  onCloseModal,
  isPending,
  isEdit,
}: {
  onCloseModal: () => void;
  isPending: boolean;
  isEdit?: boolean;
}) => {
  return (
    <DialogActions sx={{ p: 3, gap: 2 }}>
      <Button variant="outlined" onClick={onCloseModal} fullWidth>
        Cancel
      </Button>
      <Button type="submit" variant="contained" disabled={isPending} fullWidth>
        {isPending
          ? isEdit
            ? "Saving..."
            : "Adding..."
          : isEdit
          ? "Save Changes"
          : "Add Pin"}
      </Button>
    </DialogActions>
  );
};
