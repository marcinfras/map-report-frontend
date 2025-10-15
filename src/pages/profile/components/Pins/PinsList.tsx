import { List } from "@mui/material";
import type { AdminPin, MyPin } from "../../../../store/pinsStore";
import { PinItem } from "./PinItem";
import { PinsPagination } from "./PinsPagination";

export const PinsList = ({
  pins,
  setDeletedPinId,
  page,
  setPage,
  totalPages,
}: {
  pins: MyPin[] | AdminPin[];
  setDeletedPinId: React.Dispatch<React.SetStateAction<string | null>>;
  page: number;
  setPage: (newPage: number) => void;
  totalPages: number;
}) => {
  return (
    <>
      <List>
        {pins.map((pin, index) => (
          <PinItem
            key={pin.id}
            isLast={index === pins.length - 1}
            pin={pin}
            setDeletedPinId={setDeletedPinId}
          />
        ))}
      </List>
      <PinsPagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};
