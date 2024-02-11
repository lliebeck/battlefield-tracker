"use client";

import { useColorMode } from "@/stores/colorModeStore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

export default function DarkModeSwitcher() {
  const { mode, setMode } = useColorMode();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => {
        console.log("Hallo");
        setMode(mode === "dark" ? "light" : "dark");
      }}
      color="inherit"
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
