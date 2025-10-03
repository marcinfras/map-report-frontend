import { LocationPin, Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";

export const NavAuthMenu = ({
  user,
  logout,
  isLoggingOut,
}: {
  user: {
    _id: string;
    email: string;
    profile: {
      _id: string;
      fullName: string;
      role: string;
      avatar?: string;
    };
  };
  logout: () => void;
  isLoggingOut: boolean;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  return (
    <>
      <Button
        onClick={handleMenuOpen}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          p: 1,
          minWidth: "auto",
        }}
      >
        <Avatar src={user.profile.avatar} sx={{ width: 32, height: 32 }}>
          {user.profile.fullName.charAt(0)}
        </Avatar>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 200 },
        }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to="/profile/mypins"
        >
          <ListItemIcon>
            <LocationPin fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Pins</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
