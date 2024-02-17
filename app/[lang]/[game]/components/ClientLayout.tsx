"use client";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { CustomAppBar } from "./CustomAppBar";
import { SideNav } from "./SideNav";

export default function ClientLayout({
  children,
}: {} & React.PropsWithChildren) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Box>
        <CustomAppBar setOpen={setOpen} />
        <SideNav open={open} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
