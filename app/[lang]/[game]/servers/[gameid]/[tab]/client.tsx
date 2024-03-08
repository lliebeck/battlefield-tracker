"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useBf1detailedserversBf1DetailedserverGet,
  useBf1playersBf1PlayersGet,
} from "@/api/battlefield-1/battlefield-1";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import { useParams, useRouter } from "next/navigation";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ServerRoutes } from "./tabs.types";
import { ServerInfo } from "./(serverinfo)/client";
import { ServerDashboard } from "./(dashboard)/client";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionaryPlayer: Awaited<ReturnType<typeof getDictionary>>["player"];
  dictionaryServer: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ dictionaryPlayer, dictionaryServer }: Props) => {
  const { tab } = useParams();
  const router = useRouter();

  if (tab === ServerRoutes.PLAYERS)
    return <ServerDashboard dictionary={dictionaryPlayer} />;

  if (tab === ServerRoutes.INFO)
    return <ServerInfo dictionary={dictionaryServer} />;
};
