import { getDictionary } from "@/get-dictionary";
import { Client } from "./client";
import { Locale } from "@/config/i18n-config";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <Client dictionary={dictionary.legalNotice} />;
}
