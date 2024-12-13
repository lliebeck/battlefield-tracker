import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { i18n, type Locale } from "../config/i18n-config";
import ClientLayout from "./[lang]/components/ClientLayout";
import ReactQueryProviders from "./[lang]//components/ReactQueryProviders";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Battlefield",
  description: "Find your battlefield lobby",
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: Locale };
  }>
) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <html lang={params.lang}>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ReactQueryProviders>
            <AppThemeProvider>
              <ClientLayout>{children}</ClientLayout>
            </AppThemeProvider>
          </ReactQueryProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
