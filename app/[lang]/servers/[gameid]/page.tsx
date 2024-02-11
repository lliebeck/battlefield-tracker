import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import { Client } from "./client";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  let servers: AxiosResponse<Bf1DetailedServerInfo, any> | undefined =
    undefined;

  try {
    servers = await axios.get<Bf1DetailedServerInfo>(
      "https://api.gametools.network/bf1/detailedserver",
      {
        params: {
          gameid: gameid,
        },
      }
    );
  } catch (ex) {
    //
  }
  const dictionary = await getDictionary(lang);

  return <Client servers={servers?.data} dictionary={dictionary.server} />;
}
