"use client";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { CustomAppBar } from "./CustomAppBar";
import { SideNav } from "./SideNav";
import Footer from "./Footer";
import { getDictionary } from "@/get-dictionary";

export default function ClientLayout({
  children,
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["footer"];
} & React.PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <CustomAppBar setOpen={setOpen} />
        <SideNav open={open} setOpen={setOpen} />
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
        <Footer dictionary={dictionary} />
      </Box>
    </>
  );
}
