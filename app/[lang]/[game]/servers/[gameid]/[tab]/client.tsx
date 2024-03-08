"use client";

import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import { useParams } from "next/navigation";
import { ServerDashboard } from "./(dashboard)/client";
import { ServerInfo } from "./(serverinfo)/client";
import { ServerRoutes } from "./tabs.types";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionaryPlayer: Awaited<ReturnType<typeof getDictionary>>["player"];
  dictionaryServer: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ dictionaryPlayer, dictionaryServer }: Props) => {
  const { tab } = useParams();

  if (tab === ServerRoutes.PLAYERS)
    return <ServerDashboard dictionary={dictionaryPlayer} />;

  if (tab === ServerRoutes.INFO)
    return <ServerInfo dictionary={dictionaryServer} />;
};
