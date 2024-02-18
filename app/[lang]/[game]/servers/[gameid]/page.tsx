import { Locale } from "@/config/i18n-config";
import { redirect } from "next/navigation";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  redirect(`/${lang}/battlefield1/servers/${gameid}/players`);
}
