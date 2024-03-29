"use client";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { DashboardPlayer } from "./dashboard.types";

type ItemProps = {
  player: DashboardPlayer | undefined;
};

export const DisplayUserName = ({ player }: ItemProps) => {
  return (
    <>
      <Box display="flex">
        <Avatar src={player?.avatar?.toString()} />
        <Box marginLeft={1} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} flexDirection={"row"}>
            <Box component="img" height={19} alt="" src={player?.rankImg} />
            <Box alignSelf={"center"} marginLeft={0.25}>
              <Typography variant="caption">{player?.rank}</Typography>
            </Box>
          </Box>
          <Typography variant="subtitle2">
            {player?.userName ? player?.userName : "Unknown"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
