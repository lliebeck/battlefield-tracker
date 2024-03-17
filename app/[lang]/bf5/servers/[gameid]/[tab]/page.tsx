import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import { Client } from "./client";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  let servers: AxiosResponse<Bf5DetailedServerInfo, any> | undefined =
    undefined;

  try {
    servers = await axios.get<Bf5DetailedServerInfo>(
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

  return <Client servers={servers?.data} dictionary={dictionary} />;
}
