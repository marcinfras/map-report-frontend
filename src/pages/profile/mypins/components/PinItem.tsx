import { Avatar, Box, Divider, ListItem, ListItemAvatar } from "@mui/material";

import { type MyPin } from "../../../../store/pinsStore";
import { PinItemChips } from "./PinItemChips";
import { PinItemText } from "./PinItemText";
import { PinItemButtons } from "./PinItemButtons";

interface MyPinItemProps {
  pin: MyPin;
  isLast: boolean;
  setDeletedPinId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PinItem = ({ pin, isLast, setDeletedPinId }: MyPinItemProps) => {
  return (
    <Box key={pin.id}>
      <ListItem
        alignItems="flex-start"
        sx={{
          py: 1,
          px: 2,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          minHeight: { xs: 240, sm: 150 },
          maxHeight: { xs: 240, sm: 150 },
          transition: "background-color 0.2s",
          "&:hover": { backgroundColor: "action.hover" },
        }}
      >
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            src={pin.image || undefined}
            sx={{
              bgcolor: "grey.200",
              width: 56,
              height: 56,
              img: { objectFit: "contain" },
            }}
          >
            {pin.title.charAt(0)}
          </Avatar>
        </ListItemAvatar>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            ml: { xs: 0, sm: 2 },
            mt: { xs: 1, sm: 0 },
            minWidth: 0,
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <PinItemChips type={pin.type} status={pin.status} />

          <PinItemText
            createdAt={pin.createdAt}
            title={pin.title}
            description={pin.description}
          />
        </Box>

        <PinItemButtons id={pin.id} setDeletedPinId={setDeletedPinId} />
      </ListItem>
      {!isLast && <Divider component="li" />}
    </Box>
  );
};
