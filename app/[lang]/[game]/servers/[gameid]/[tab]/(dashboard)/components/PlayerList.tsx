"use client";

import { FrostbiteServerPlayer } from "@/api/model/frostbiteServerPlayer";
import { getDictionary } from "@/get-dictionary";
import { TableRow, useMediaQuery, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { PlayerRow } from "./PlayerRow";

type Props = {
  players: FrostbiteServerPlayer[] | undefined;
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
      id: "accuracy",
      numeric: false,
      disablePadding: false,
      label: dictionary.accuracy,
    },
    {
      id: "headshots",
      numeric: false,
      disablePadding: false,
      label: dictionary.headShots,
    },
    {
      id: "sus",
      numeric: false,
      disablePadding: false,
      label: isUpLg ? dictionary.suspicious : dictionary.suspiciousShort,
    },
    {
      id: "redirectIcon",
      numeric: false,
      disablePadding: false,
      label: dictionary.tracker,
    },
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "100%",
      }}
    >
      <Table stickyHeader size="small">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
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
