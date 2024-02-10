import { FrostbiteServerList } from "@/api/model/frostbiteServerList";
import { Client } from "./client";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/config/i18n-config";

async function fetchServers() {
  const data = await fetch(
    "https://api.gametools.network//bf1/servers?name=bob"
  );
  return data.ok ? data.json() : undefined;
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const servers: FrostbiteServerList[] = await fetchServers();
  const dictionary = await getDictionary(lang);

  return <Client servers={servers} dictionary={dictionary.server} />;
}
