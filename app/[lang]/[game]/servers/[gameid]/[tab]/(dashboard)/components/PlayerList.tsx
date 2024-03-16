"use client";

import { getDictionary } from "@/get-dictionary";
import {
  Box,
  TableRow,
  TableSortLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { visuallyHidden } from "@mui/utils";
import { useCallback, useMemo, useState } from "react";
import { AdvancedPlayer } from "../client";
import { PlayerRow } from "./PlayerRow";

type Order = "asc" | "desc";

type Props = {
  players: AdvancedPlayer[] | undefined;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

type HeadCell = {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
};

enum SortableHeaders {
  USERNAME = "userName",
  KILLDEATH = "killDeath",
  ACCURACY = "accuracy",
  HEADSHOTS = "headshots",
}

export const PlayerList = ({ players, dictionary }: Props) => {
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up("xl"));
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortableHeaders>(
    SortableHeaders.USERNAME
  );

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortStrings = useCallback(
    (a: string | null | undefined, b: string | null | undefined) => {
      if (!a || !b) return 0;
      return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    },
    [order]
  );

  const sortNumbers = useCallback(
    (a: number | undefined, b: number | undefined) => {
      if (!a || !b) return 0;
      return order === "asc" ? a - b : b - a;
    },
    [order]
  );

  const sortPercentage = useCallback(
    (a: string | undefined, b: string | undefined) => {
      if (!a || !b) return 0;
      const castedA = parseFloat(a.replace("%", ""));
      const castedB = parseFloat(b.replace("%", ""));
      if (isNaN(castedA) || isNaN(castedB)) return 0;
      return order === "asc" ? castedA - castedB : castedB - castedA;
    },
    [order]
  );

  const sortedPlayers = useMemo(() => {
    switch (orderBy) {
      case SortableHeaders.USERNAME: {
        return players?.sort((a, b) => {
          return sortStrings(
            a.advancedData?.userName,
            b.advancedData?.userName
          );
        });
      }
      case SortableHeaders.KILLDEATH: {
        return players?.sort((a, b) => {
          return sortNumbers(
            a.advancedData?.killDeath,
            b.advancedData?.killDeath
          );
        });
      }
      case SortableHeaders.HEADSHOTS: {
        return players?.sort((a, b) => {
          return sortPercentage(
            a.advancedData?.headshots?.toString(),
            b.advancedData?.headshots?.toString()
          );
        });
      }
      case SortableHeaders.ACCURACY: {
        return players?.sort((a, b) => {
          return sortPercentage(
            a.advancedData?.accuracy?.toString(),
            b.advancedData?.accuracy?.toString()
          );
        });
      }
      default:
        return players;
    }
  }, [orderBy, players, sortNumbers, sortPercentage, sortStrings]);

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

  if (!players) return;
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
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {Object.values(SortableHeaders).some(
                  (x) => x === headCell.id
                ) ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers?.map((player) => (
            <PlayerRow key={player.basicData.player_id} player={player} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
