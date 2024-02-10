import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { i18n, type Locale } from "../../config/i18n-config";
import { CustomAppBar } from "./components/CustomAppBar";
import ReactQueryProviders from "./components/ReactQueryProviders";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Next App Template",
  description: "Next template with MUI and i18n",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ReactQueryProviders>
            <AppThemeProvider>
              <CustomAppBar />
              {children}
            </AppThemeProvider>
          </ReactQueryProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
