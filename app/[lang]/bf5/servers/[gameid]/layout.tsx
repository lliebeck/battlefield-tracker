import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import ClientLayout from "./clientLayout";

export default async function ServerLayout({
  children,
  params,
}: {
  params: Promise<{ lang: string; gameid: string }>;
} & React.PropsWithChildren) {
  const { lang, gameid } = await params;

  const dictionary = await getDictionary(lang as Locale);

  let serverInfo: AxiosResponse<Bf5DetailedServerInfo, any> | undefined =
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
      }
    );
  } catch (ex) {}

  return (
    <ClientLayout dictionary={dictionary.general} serverInfo={serverInfo?.data}>
      {children}
    </ClientLayout>
  );
}
