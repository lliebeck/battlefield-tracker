"use client";

import { Bf1ServerPlayers } from "@/api/model";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { PlayerList } from "./PlayerList";

type Props = {
  bf1ServerPlayers?: Bf1ServerPlayers;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const ServerDashboard = ({ dictionary, bf1ServerPlayers }: Props) => {
  const teamOne = useMemo(
    () => bf1ServerPlayers?.teams[0],
    [bf1ServerPlayers?.teams]
  );

  const teamTwo = useMemo(
    () => bf1ServerPlayers?.teams[1],
    [bf1ServerPlayers?.teams]
  );

  return (
    <Box marginX={3}>
      <Grid container spacing={0.5}>
        <Grid item sm={12} md={6}>
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
        <Grid item sm={12} md={6}>
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
    </Box>
  );
};
