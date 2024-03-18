"use client";
import { getDictionary } from "@/get-dictionary";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { games } from "../types/games.types";
import ClickAwayListener from "@mui/material/ClickAwayListener";

type Props = {
  dictionary?: Awaited<ReturnType<typeof getDictionary>>["server"];
  open: boolean;
  setOpen: (value: any) => void;
};

const drawerWidth = 220;

export const SideNav = ({ open = true, setOpen }: Props) => {
  const router = useRouter();
  const { lang } = useParams();
  const path = usePathname();

  const mainListItems = useMemo(() => {
    return games.map((game) => {
      return (
        <ListItemButton
          key={game.key}
          selected={path.includes(game.key)}
          disabled={!game.available}
          onClick={() => {
            setOpen(false);
            router.push(`/${lang ?? "en"}/${game.key}/servers`);
          }}
        >
          <ListItemText
            primary={game.name}
            secondary={!game.available ? "(coming soon)" : null}
          />
        </ListItemButton>
      );
    });
  }, [lang, path, router, setOpen]);

  return (
    <>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => open && setOpen(false)}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={(_, reason) => reason === "backdropClick" && setOpen(false)}
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
      </ClickAwayListener>
    </>
  );
};
