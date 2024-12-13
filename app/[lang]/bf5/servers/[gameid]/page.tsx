import { Locale } from "@/config/i18n-config";
import { redirect } from "next/navigation";
import { ServerRoutes } from "./tabs.types";

export default async function Page(
  props: {
    params: Promise<{ lang: Locale; gameid: string }>;
  }
) {
  const params = await props.params;

  const {
    lang,
    gameid
  } = params;

  redirect(`/${lang}/bf5/servers/${gameid}/${ServerRoutes.PLAYERS}`);
}
