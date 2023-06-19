import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./HamburgerMenu.css";

export const HamburgerMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="hamburger-menu-container">
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" role="presentation" textAlign="center">
          <Typography variant="h6" component="div">
            Welcome!
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;
