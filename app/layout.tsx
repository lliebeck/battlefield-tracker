import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { i18n, type Locale } from "../config/i18n-config";
import ClientLayout from "./[lang]/components/ClientLayout";
import ReactQueryProviders from "./[lang]//components/ReactQueryProviders";
import { getDictionary } from "@/get-dictionary";

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
    params: Promise<{ lang: Locale }>;
  }>
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ReactQueryProviders>
            <AppThemeProvider>
              <ClientLayout dictionary={dictionary.footer}>
                {props.children}
              </ClientLayout>
            </AppThemeProvider>
          </ReactQueryProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
