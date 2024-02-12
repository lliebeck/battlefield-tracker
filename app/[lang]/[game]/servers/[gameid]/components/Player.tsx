"use client";

import { useBf1AllBf1AllGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteServerPlayer } from "@/api/model/frostbiteServerPlayer";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

type Props = {
  player: FrostbiteServerPlayer;
};

export const Player = ({ player }: Props) => {
  const {
    data: allPlayerData,
    isLoading,
    error,
  } = useBf1AllBf1AllGet(
    {
      playerid: player.player_id,
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  if (isLoading) {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          <Skeleton variant="circular" width={40} height={40} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={210} height={60} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={210} height={60} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={210} height={60} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={210} height={60} />
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      <TableRow
        key={allPlayerData?.data?.id}
        hover
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Box display="flex">
            <Avatar src={allPlayerData?.data?.avatar ?? ""} />
            <Box alignSelf="center" marginLeft={1}>
              {error ? "Unknown" : allPlayerData?.data?.userName}
            </Box>
          </Box>
        </TableCell>
        <TableCell align="left">
          {allPlayerData?.data?.killsPerMinute}
        </TableCell>
        <TableCell align="left">{allPlayerData?.data?.killDeath}</TableCell>
        <TableCell align="left">{allPlayerData?.data?.accuracy}</TableCell>
        <TableCell align="left">{allPlayerData?.data?.headshots}</TableCell>
      </TableRow>
    </>
  );
};
