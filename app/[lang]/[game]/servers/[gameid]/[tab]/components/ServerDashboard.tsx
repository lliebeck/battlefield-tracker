"use client";

import { Bf1ServerPlayers } from "@/api/model";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { PlayerList } from "./PlayerList";
import { useBf1playersBf1PlayersGet } from "@/api/battlefield-1/battlefield-1";
import { useParams } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const ServerDashboard = ({ dictionary }: Props) => {
  const { gameid } = useParams();
  const {
    data: bf1ServerPlayers,
    isLoading,
    error,
  } = useBf1playersBf1PlayersGet(
    {
      gameid: gameid as string,
    },
    {
      query: {
        retry: 2,
      },
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("md"));

  const teamOne = useMemo(
    () => bf1ServerPlayers?.data.teams[0],
    [bf1ServerPlayers?.data.teams]
  );

  const teamTwo = useMemo(
    () => bf1ServerPlayers?.data.teams[1],
    [bf1ServerPlayers?.data.teams]
  );

  const tableHeight = useMemo(
    () => `calc(${isLgUp ? "100%" : "50%"} - ${isLgUp ? "60px" : "45px"})`,
    [isLgUp]
  );

  const headerVariant: "h4" | "h6" = useMemo(
    () => (isLgUp ? "h4" : "h6"),
    [isLgUp]
  );

  const headerPicSize = useMemo(() => (isLgUp ? 50 : 30), [isLgUp]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error?.status && error?.status >= 500 && error?.status < 600) {
    return <Typography variant="h6">Services not available!</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Something went wrong!</Typography>;
  }

  return (
    <Grid container spacing={0.5} height={"100%"}>
      <Grid
        item
        sm={12}
        lg={6}
        height={tableHeight}
        // maxWidth={isSmDown ? "250px" : "100%"}
      >
        <Grid item marginY={1}>
          <Box display={"flex"}>
            <Box
              component="img"
              height={headerPicSize}
              alt="Image of the Team"
              src={teamOne?.image}
            />
            <Typography
              variant={headerVariant}
              alignSelf={"center"}
              marginLeft={1}
            >
              {teamOne?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item height={"100%"}>
          <PlayerList
            players={teamOne?.players ?? []}
            dictionary={dictionary}
          />
        </Grid>
      </Grid>
      <Grid
        item
        sm={12}
        lg={6}
        height={tableHeight}
        // maxWidth={isSmDown ? "250px" : "100%"}
      >
        <Grid item marginY={1}>
          <Box display={"flex"}>
            <Box
              component="img"
              height={headerPicSize}
              alt="Image of the Team"
              src={teamTwo?.image}
            />
            <Typography
              variant={headerVariant}
              alignSelf={"center"}
              marginLeft={1}
            >
              {teamTwo?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item height={"100%"}>
          <PlayerList
            players={teamTwo?.players ?? []}
            dictionary={dictionary}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
