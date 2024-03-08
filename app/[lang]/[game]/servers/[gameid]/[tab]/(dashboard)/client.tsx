"use client";

import { useBf1playersBf1PlayersGet } from "@/api/battlefield-1/battlefield-1";
import { getDictionary } from "@/get-dictionary";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { PlayerList } from "./components/PlayerList";

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
    <Grid container spacing={0.5} height={"100%"}>
      <Grid
        item
        sm={12}
        lg={6}
        height={`calc(${isLgUp ? "100%" : "50%"} - ${
          isLgUp ? "60px" : "45px"
        })`}
      >
        <Grid item marginY={1}>
          <Box display={"flex"}>
            <Box
              component="img"
              height={isLgUp ? 50 : 30}
              alt="Image of the Team"
              src={teamOne?.image}
            />
            <Typography
              variant={`${isLgUp ? "h4" : "h6"}`}
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
        height={`calc(${isLgUp ? "100%" : "50%"} - ${
          isLgUp ? "60px" : "45px"
        })`}
      >
        <Grid item marginY={1}>
          <Box display={"flex"}>
            <Box
              component="img"
              height={isLgUp ? 50 : 30}
              alt="Image of the Team"
              src={teamTwo?.image}
            />
            <Typography
              variant={`${isLgUp ? "h4" : "h6"}`}
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
