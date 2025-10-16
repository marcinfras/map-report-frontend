import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { usePinsStore } from "../../../../store/pinsStore";
import { useNavigate } from "react-router";

export const PinItemButtons = ({
  id,
  setDeletedPinId,
}: {
  id: string;
  setDeletedPinId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { setIsDeletePinDialogOpen } = usePinsStore();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      gap={1}
      mt={{ xs: "auto", sm: 0 }}
      flexDirection={{ xs: "row", sm: "column" }}
      alignItems={{ xs: "flex-start", sm: "flex-end" }}
    >
      <IconButton
        size="small"
        color="primary"
        onClick={() => navigate(`/map/pins/${id}`)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={() => {
          setDeletedPinId(id);
          setIsDeletePinDialogOpen(true);
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
