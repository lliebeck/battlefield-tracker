import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { PropsWithChildren } from "react";
import ClientLayout from "./clientLayout";

export default async function ServerLayout(
  props: {
    params: { lang: Locale; gameid: string };
  } & PropsWithChildren
) {
  const params = await props.params;

  const {
    children
  } = props;

  const dictionary = await getDictionary(params.lang);

  let serverInfo: AxiosResponse<Bf1DetailedServerInfo, any> | undefined =
    undefined;

  const client = axios.create({ baseURL: "https://api.gametools.network/" });
  axiosRetry(client, { retries: 10 });

  try {
    serverInfo = await client.get<Bf1DetailedServerInfo>(
      "/bf1/detailedserver/",
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
