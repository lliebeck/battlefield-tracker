import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";
import { ServerInfo } from "@/app/[lang]/components/ServerInfo/ServerInfo";
import { CustomApiError } from "@/app/lib/exceptions";
import { AxiosErrorToApiError } from "@/app/tools/Mapper";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  let serverInfo: AxiosResponse<Bf5DetailedServerInfo, any> | undefined =
    undefined;

  const client = axios.create({ baseURL: "https://api.gametools.network/" });
  axiosRetry(client, { retries: 3 });

  try {
    serverInfo = await client.get<Bf5DetailedServerInfo>(
      "/bfv/detailedserver/",
      {
        params: {
          gameid: gameid,
          lang: lang == "en-us",
        },
      }
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e);
      throw new CustomApiError(JSON.stringify(AxiosErrorToApiError(e)));
    }
  }

  const dictionary = await getDictionary(lang);

  return <ServerInfo serverInfo={serverInfo?.data} dictionary={dictionary} />;
}
