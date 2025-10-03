import { ListItemText, Typography } from "@mui/material";
import { formatDate } from "../../../../helpers/helpers";

export const PinItemText = ({
  createdAt,
  title,
  description,
}: {
  createdAt: string;
  title: string;
  description: string;
}) => {
  return (
    <>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 0.5, whiteSpace: "nowrap" }}
      >
        {formatDate(createdAt)}
      </Typography>

      <ListItemText
        primary={
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
        }
        secondary={
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
        }
      />
    </>
  );
};
