import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { usePinsStore } from "../../../../store/pinsStore";
import { usePinMutations } from "../../../../hooks/usePinMutations";
import { useNavigate } from "react-router";

export const ConfirmDeletePinDialog = ({ id }: { id: string }) => {
  const { deletePinDialogOpen, setIsDeletePinDialogOpen } = usePinsStore();
  const navigate = useNavigate();
  const { deleteMutate } = usePinMutations(() => {
    onClose();
    navigate("/map", {
      replace: true,
    });
  });

  const onClose = () => {
    setIsDeletePinDialogOpen(false);
  };

  const onDelete = () => {
    deleteMutate.mutate(id);
  };

  return (
    <Dialog open={deletePinDialogOpen} onClose={onClose}>
      <DialogTitle>Delete Pin</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this pin? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          color="error"
          variant="contained"
          disabled={deleteMutate.isPending}
        >
          {deleteMutate.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
