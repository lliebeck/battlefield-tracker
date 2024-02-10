"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { useColorMode } from "../stores/colorModeStore";
import { useMemo } from "react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const AppThemeProvider = ({
  children,
}: {} & React.PropsWithChildren) => {
  const { mode } = useColorMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
        typography: {
          fontFamily: roboto.style.fontFamily,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
