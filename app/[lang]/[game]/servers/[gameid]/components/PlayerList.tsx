"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PlayerRow } from "./PlayerRow";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import { FrostbiteServerPlayer } from "@/api/model/frostbiteServerPlayer";

type Props = {
  players: FrostbiteServerPlayer[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const PlayerList = ({ players, dictionary }: Props) => {
  return (
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
          {players?.map((player) => (
            <PlayerRow key={player.player_id} player={player} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
