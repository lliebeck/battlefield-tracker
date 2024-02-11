"use client";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { CustomAppBar } from "./CustomAppBar";
import { SideNav } from "./SideNav";

export default function ClientLayout({
  children,
}: {} & React.PropsWithChildren) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CustomAppBar />
        <SideNav />
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
