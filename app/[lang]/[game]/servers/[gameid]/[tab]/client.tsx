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
import { ServerDashboard } from "./components/ServerDashboard";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ServerInfo } from "./components/ServerInfo";
import { ServerRoutes } from "./tabs.types";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const Client = ({ dictionary }: Props) => {
  const { tab } = useParams();
  const router = useRouter();

  if (tab === ServerRoutes.PLAYERS)
    return <ServerDashboard dictionary={dictionary} />;

  if (tab === ServerRoutes.INFO) return <ServerInfo />;
};
