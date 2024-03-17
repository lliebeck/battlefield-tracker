"use client";
import { Bf1CombinedAvatar } from "@/api/model/bf1CombinedAvatar";
import { Bf1CombinedUserName } from "@/api/model/bf1CombinedUserName";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

type ItemProps = {
  userName: Bf1CombinedUserName | undefined;
  avatar: Bf1CombinedAvatar | undefined;
  rankImg: string | undefined;
  rank: number | undefined;
};

export const DisplayUserName = ({
  userName,
  avatar,
  rank,
  rankImg,
}: ItemProps) => {
  return (
    <>
      <Box display="flex">
        <Avatar src={avatar ?? ""} />
        <Box marginLeft={1} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} flexDirection={"row"}>
            <Box component="img" height={19} alt="" src={rankImg ?? ""} />
            <Box alignSelf={"center"} marginLeft={0.25}>
              <Typography variant="caption">{rank}</Typography>
            </Box>
          </Box>
          <Typography variant="subtitle2">
            {userName ? userName : "Unknown"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
