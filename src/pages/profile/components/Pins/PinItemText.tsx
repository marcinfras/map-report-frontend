import { Box, ListItemText, Typography } from "@mui/material";
import { formatDate } from "@helpers/helpers";

export const PinItemText = ({
  createdAt,
  title,
  description,
  author,
}: {
  createdAt: string;
  title: string;
  description: string;
  author?: string;
}) => {
  return (
    <>
      <Box mb={0.5}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {formatDate(createdAt)}
        </Typography>
        {author && (
          <Typography
            component="p"
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: "nowrap" }}
          >
            {author}
          </Typography>
        )}
      </Box>

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
