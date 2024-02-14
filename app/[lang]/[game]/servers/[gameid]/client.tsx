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
import { Player } from "./components/Player";

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

  const { data: players, isLoading: isPlayersLoading } =
    useBf1playersBf1PlayersGet(
      {
        gameid: gameid as string,
      }
      // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );

  // return <pre>{JSON.stringify(players, undefined, 2)}</pre>;
  return (
    <Box marginX={3}>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{dictionary.userName}</TableCell>
              <TableCell align="left">{dictionary.killsPerMinute}</TableCell>
              <TableCell align="left">{dictionary.killDeath}</TableCell>
              <TableCell align="left">{dictionary.accuracy}</TableCell>
              <TableCell align="left">{dictionary.headShots}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players?.data?.teams?.map((team) =>
              team.players.map((player) => (
                <Player key={player.player_id} player={player} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
