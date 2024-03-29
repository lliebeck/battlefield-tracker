import { Locale } from "@/config/i18n-config";
import { permanentRedirect, redirect } from "next/navigation";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  redirect(`/${lang}/bf5/servers/${gameid}/players`);
}
