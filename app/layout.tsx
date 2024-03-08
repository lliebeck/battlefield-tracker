import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { i18n, type Locale } from "../config/i18n-config";
import ClientLayout from "./[lang]/[game]/components/ClientLayout";
import ReactQueryProviders from "./[lang]/[game]/components/ReactQueryProviders";
import Image from "next/image";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Battlefield",
  description: "Find your battlefield lobby",
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
              <Image
                src="/crosshair.svg"
                alt="Vercel Logo"
                // className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
              <ClientLayout>{children}</ClientLayout>
            </AppThemeProvider>
          </ReactQueryProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
