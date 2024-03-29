import { Locale } from "@/config/i18n-config";
import { redirect } from "next/navigation";
import { ServerRoutes } from "./tabs.types";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  redirect(`/${lang}/bf5/servers/${gameid}/${ServerRoutes.PLAYERS}`);
}
