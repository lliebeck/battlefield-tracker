"use client";

import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import { createEmptyAxiosResponse } from "@/utils/axiosResponse";
import { useParams } from "next/navigation";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const { gameid } = useParams();
  console.log(gameid);
  const { data: servers, isLoading } =
    useBf1detailedserversBf1DetailedserverGet(
      {
        gameid: gameid as string,
      },
      { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );

  return <pre>{JSON.stringify(servers, undefined, 2)}</pre>;
};
