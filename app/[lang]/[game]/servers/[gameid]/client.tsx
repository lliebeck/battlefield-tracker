"use client";

import {
  useBf1detailedserversBf1DetailedserverGet,
  useBf1playersBf1PlayersGet,
} from "@/api/battlefield-1/battlefield-1";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useParams } from "next/navigation";
import { PlayerRow } from "./components/PlayerRow";
import Grid from "@mui/material/Grid";
import { PlayerList } from "./components/PlayerList";
import { ServerDashboard } from "./components/ServerDashboard";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const { gameid } = useParams();
  const { data: servers, isLoading } =
    useBf1detailedserversBf1DetailedserverGet(
      {
        gameid: gameid as string,
      }
      // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );

  const { data: bf1ServerPlayers, isLoading: isPlayersLoading } =
    useBf1playersBf1PlayersGet(
      {
        gameid: gameid as string,
      }
      // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );

  return (
    <Box marginX={3}>
      <ServerDashboard
        bf1ServerPlayers={bf1ServerPlayers?.data}
        dictionary={dictionary}
      />
    </Box>
  );
};
