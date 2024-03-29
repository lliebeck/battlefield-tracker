"use client";

import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";
import { BfvServerPlayers } from "@/api/model/bfvServerPlayers";
import { useParams } from "next/navigation";
import { ServerDashboard } from "./(dashboard)/client";
import { ServerInfoClient } from "./(serverinfo)/client";
import { ICombinedDictionaries, ServerRoutes } from "./tabs.types";

type Props = {
  serverInfo: Bf5DetailedServerInfo | undefined;
  bf5ServerPlayers: BfvServerPlayers | undefined;
  dictionary: ICombinedDictionaries;
};

export const Client = ({ dictionary, serverInfo, bf5ServerPlayers }: Props) => {
  const { tab } = useParams();

  if (tab === ServerRoutes.PLAYERS)
    return (
      <ServerDashboard
        dictionary={dictionary}
        bf5ServerPlayers={bf5ServerPlayers}
      />
    );

  if (tab === ServerRoutes.INFO)
    return <ServerInfoClient serverInfo={serverInfo} dictionary={dictionary} />;
};
