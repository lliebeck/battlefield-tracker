"use client";
import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useCallback, useMemo, useState } from "react";
import { DisplayUserName } from "./DisplayUserName";
import { PlayerAdvancedRow } from "./PlayerAdvancedRow";
import { DashboardPlayer } from "./dashboard.types";

type Props = {
  isLoading: boolean;
  player: DashboardPlayer | undefined;
};

export const PlayerRow = ({ player, isLoading }: Props) => {
  const [open, setOpen] = useState(false);
  const error = useMemo(() => player === undefined, [player]);

  const getNumberOfPercentage = useCallback((value: string | undefined) => {
    if (!value) return;
    const arr = value.split("%");
    let number = undefined;
    try {
      number = Number(arr[0]);
    } catch (ex) {}

    return number;
  }, []);

  const suspiciousStats: string[] = useMemo(() => {
    const arr: string[] = [];
    const acc = getNumberOfPercentage(player?.accuracy?.toString());
    const headshotPercentage = getNumberOfPercentage(
      player?.headshots?.toString()
    );

    if (acc && acc > 50) arr.push("accuracy");
    if (headshotPercentage && headshotPercentage > 50) arr.push("headshots");

    return arr;
  }, [getNumberOfPercentage, player?.accuracy, player?.headshots]);

  if (isLoading) {
    return (
      <TableRow>
        <TableCell component="th" scope="row"></TableCell>
        <TableCell component="th" scope="row">
          <Skeleton variant="circular" width={40} height={40} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="100%" height={40} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="100%" height={40} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="100%" height={40} />
        </TableCell>
        <TableCell>
          <Skeleton variant="circular" width={25} height={25} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="100%" height={40} />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableRow
        key={player?.id ?? crypto.randomUUID()}
        hover
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell key={player?.id ?? crypto.randomUUID()}>
          {!error && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          <DisplayUserName player={player} />
        </TableCell>
        <TableCell align="left">{player?.killDeath}</TableCell>
        <TableCell align="left">{player?.accuracy}</TableCell>
        <TableCell align="left">{player?.headshots}</TableCell>
        <TableCell align="left">
          {!error && (
            <CircleIcon
              color={suspiciousStats.length > 0 ? "error" : "success"}
            />
          )}
        </TableCell>
        <TableCell align="left">
          {!error && (
            <IconButton
              href={`https://battlefieldtracker.com/bf1/profile/origin/${player?.userName}/overview`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LaunchIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      {!error && <PlayerAdvancedRow show={open} player={player} />}
    </>
  );
};
