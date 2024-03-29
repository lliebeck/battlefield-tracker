import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";
import { BfvServerPlayers } from "@/api/model/bfvServerPlayers";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Client } from "./client";
import { CustomApiError } from "@/app/lib/exceptions";
import { AxiosErrorToApiError } from "@/app/tools/Mapper";
import axiosRetry from "axios-retry";

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  axiosRetry(axios, { retries: 3 });
  let serverInfo: AxiosResponse<Bf5DetailedServerInfo, any> | undefined =
    undefined;

  let bf5ServerPlayers: AxiosResponse<BfvServerPlayers, any> | undefined =
    undefined;

  const client = axios.create({ baseURL: "https://api.gametools.network/" });
  axiosRetry(client, { retries: 10 });

  try {
    serverInfo = await client.get<Bf5DetailedServerInfo>(
      "/bfv/detailedserver/",
      {
        params: {
          gameid: gameid,
        },
        timeout: 15000,
      }
    );

    bf5ServerPlayers = await client.get<BfvServerPlayers>("/bfv/players/", {
      params: {
        gameid: gameid,
      },
    });
  } catch (ex) {
    // console.log(ex);
    // console.log(ex instanceof AxiosError);
    // if (ex instanceof AxiosError) {
    //   throw new CustomApiError(JSON.stringify(AxiosErrorToApiError(ex)));
    // }
  }

  const dictionary = await getDictionary(lang);

  // if (!serverInfo?.data || !bf5ServerPlayers?.data) return;

  console.log(bf5ServerPlayers?.data);

  return (
    <Client
      bf5ServerPlayers={bf5ServerPlayers?.data}
      serverInfo={serverInfo?.data}
      dictionary={dictionary}
    />
  );
}
