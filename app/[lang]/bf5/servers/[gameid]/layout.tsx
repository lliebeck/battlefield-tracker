import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { PropsWithChildren } from "react";
import ClientLayout from "./clientLayout";

export default async function ServerLayout({
  params: params,
  children,
}: {
  params: { lang: Locale; gameid: string };
} & PropsWithChildren) {
  const dictionary = await getDictionary(params.lang);

  let serverInfo: AxiosResponse<Bf5DetailedServerInfo, any> | undefined =
    undefined;

  const client = axios.create({ baseURL: "https://api.gametools.network/" });
  axiosRetry(client, { retries: 10 });

  try {
    serverInfo = await client.get<Bf5DetailedServerInfo>(
      "/bfv/detailedserver/",
      {
        params: {
          gameid: params.gameid,
        },
      }
    );
  } catch (ex) {}

  return (
    <ClientLayout dictionary={dictionary.general} serverInfo={serverInfo?.data}>
      {children}
    </ClientLayout>
  );
}
