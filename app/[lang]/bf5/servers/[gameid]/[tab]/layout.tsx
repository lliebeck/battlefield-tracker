import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import ClientLayout from "./clientLayout";
import { PropsWithChildren } from "react";

export default async function ServerLayout({
  params: { lang },
  children,
}: {
  params: { lang: Locale };
} & PropsWithChildren) {
  const dictionary = await getDictionary(lang);

  return (
    <ClientLayout dictionary={dictionary.general}>{children}</ClientLayout>
  );
}
