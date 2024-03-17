"use client";

import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import { useParams } from "next/navigation";
import { ServerDashboard } from "./(dashboard)/client";
import { ServerInfo } from "./(serverinfo)/client";
import { ICombinedDictionaries, ServerRoutes } from "./tabs.types";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionary: ICombinedDictionaries;
};

export const Client = ({ dictionary }: Props) => {
  const { tab } = useParams();

  if (tab === ServerRoutes.PLAYERS)
    return <ServerDashboard dictionary={dictionary} />;

  if (tab === ServerRoutes.INFO) return <ServerInfo dictionary={dictionary} />;
};
