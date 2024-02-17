"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeSwitcher from "./DarkModSwitcher";
import LocaleSwitcher from "./LocaleSwitcher";
import { useParams } from "next/navigation";
import { games } from "../../types/games.types";

type Props = {
  setOpen: (value: any) => void;
};

export const CustomAppBar = ({ setOpen }: Props) => {
  const { game } = useParams();
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setOpen(() => true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {games.find((x) => x.key === game)?.name ?? "Battlefield"}
        </Typography>
        <LocaleSwitcher />
        <DarkModeSwitcher />
      </Toolbar>
    </AppBar>
  );
};
