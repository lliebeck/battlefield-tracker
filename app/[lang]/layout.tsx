import { getDictionary } from "@/get-dictionary";
import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import { Locale } from "@/config/i18n-config";

export const metadata: Metadata = {
  title: "Battlefield",
  description: "Find your battlefield lobby",
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }>
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <ClientLayout dictionary={dictionary.footer}>{props.children}</ClientLayout>
  );
}
