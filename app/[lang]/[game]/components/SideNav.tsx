"use client";
import { getDictionary } from "@/get-dictionary";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { games } from "../../types/games.types";

type Props = {
  dictionary?: Awaited<ReturnType<typeof getDictionary>>["server"];
};

const drawerWidth = 250;

export const SideNav = ({ dictionary }: Props) => {
  const router = useRouter();
  const { game: selectedGame } = useParams();

  const mainListItems = useMemo(() => {
    return games.map((game) => {
      return (
        <ListItemButton
          key={game.key}
          selected={game.key === selectedGame}
          onClick={() => {
            router.push(`/${game.key}/servers`);
          }}
        >
          <ListItemText primary={game.name} />
        </ListItemButton>
      );
    });
  }, [router, selectedGame]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          px: 2,
          py: 1,
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List component="nav">{mainListItems}</List>
    </Drawer>
  );
};
