import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useSnackbarStore } from "../store/snackbarStore";

export const GlobalSnackbar = () => {
  const { open, title, message, type, hide } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={hide}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={hide} severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
