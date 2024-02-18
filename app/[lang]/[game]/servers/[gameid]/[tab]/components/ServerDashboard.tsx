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

  const teamOne = useMemo(
    () => bf1ServerPlayers?.data.teams[0],
    [bf1ServerPlayers?.data.teams]
  );

  const teamTwo = useMemo(
    () => bf1ServerPlayers?.data.teams[1],
    [bf1ServerPlayers?.data.teams]
  );

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
    <Grid container spacing={0.5}>
      <Grid item sm={12} lg={6}>
        <Grid item marginY={1}>
          <Box display={"flex"}>
            <Box
              component="img"
              height={50}
              alt="Picture of the map"
              src={teamOne?.image}
            />
            <Typography variant="h4" alignSelf={"center"} marginLeft={1}>
              {teamOne?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <PlayerList
            players={teamOne?.players ?? []}
            dictionary={dictionary}
          />
        </Grid>
      </Grid>
      <Grid item sm={12} lg={6}>
        <Grid item marginY={1}>
          <Box display={"flex"}>
            <Box
              component="img"
              height={50}
              alt="Picture of the map"
              src={teamTwo?.image}
            />
            <Typography variant="h4" alignSelf={"center"} marginLeft={1}>
              {teamTwo?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <PlayerList
            players={teamTwo?.players ?? []}
            dictionary={dictionary}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
