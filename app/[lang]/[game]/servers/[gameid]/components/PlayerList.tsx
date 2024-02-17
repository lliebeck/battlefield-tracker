"use client";

import { FrostbiteServerPlayer } from "@/api/model/frostbiteServerPlayer";
import { getDictionary } from "@/get-dictionary";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { PlayerRow } from "./PlayerRow";
import { TableRow, useMediaQuery, useTheme } from "@mui/material";

type Props = {
  players: FrostbiteServerPlayer[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

type HeadCell = {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
};

export const PlayerList = ({ players, dictionary }: Props) => {
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up("xl"));

  const headCells: readonly HeadCell[] = [
    {
      id: "collabsable",
      numeric: false,
      disablePadding: false,
      label: "",
    },
    {
      id: "userName",
      numeric: false,
      disablePadding: false,
      label: dictionary.userName,
    },
    {
      id: "killDeath",
      numeric: false,
      disablePadding: false,
      label: dictionary.killDeath,
    },
    {
      id: "killsPerMinute",
      numeric: false,
      disablePadding: false,
      label: isUpLg
        ? dictionary.killsPerMinute
        : dictionary.killsPerMinuteShort,
    },
    {
      id: "accuracy",
      numeric: false,
      disablePadding: false,
      label: dictionary.accuracy,
    },
    {
      id: "headShots",
      numeric: false,
      disablePadding: false,
      label: dictionary.headShots,
    },
    {
      id: "sus",
      numeric: true,
      disablePadding: false,
      label: "Suspicious",
    },
    {
      id: "redirectIcon",
      numeric: false,
      disablePadding: false,
      label: "",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 200 }} aria-label="simple table">
        <colgroup>
          <col style={{ width: "2%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "4%" }} />
          <col style={{ width: "4%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                // sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.label}
              </TableCell>
            ))}
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
