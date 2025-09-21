import {
  Typography,
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

export const HowItWorks = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <Card sx={{ p: 3, borderRadius: 2, border: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <InfoIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
            How It Works
          </Typography>
        </Box>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Our community mapping platform makes it easy to report issues, suggest
          improvements, and share ideas for your neighborhood.
        </Typography>
        <List sx={{ py: 0 }}>
          <ListItem sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon sx={{ fontSize: 20, color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary="Click anywhere on the map to create a new report"
              sx={{
                "& .MuiListItemText-primary": { color: "text.secondary" },
              }}
            />
          </ListItem>
          <ListItem sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon sx={{ fontSize: 20, color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary="Fill in details and upload photos if needed"
              sx={{
                "& .MuiListItemText-primary": { color: "text.secondary" },
              }}
            />
          </ListItem>
          <ListItem sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon sx={{ fontSize: 20, color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary="View and filter existing reports by type"
              sx={{
                "& .MuiListItemText-primary": { color: "text.secondary" },
              }}
            />
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};
