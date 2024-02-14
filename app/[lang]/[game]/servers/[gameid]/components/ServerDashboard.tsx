"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { PlayerList } from "./PlayerList";
import { getDictionary } from "@/get-dictionary";
import { Bf1ServerPlayers } from "@/api/model";
import Typography from "@mui/material/Typography";

type Props = {
  bf1ServerPlayers?: Bf1ServerPlayers;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const ServerDashboard = ({ dictionary, bf1ServerPlayers }: Props) => {
  return (
    <Box marginX={3}>
      <Grid container spacing={0.5}>
        <Grid item sm={6}>
          <Grid item marginY={1}>
            <Box display={"flex"}>
              <Box
                component="img"
                height={50}
                alt="Picture of the map"
                src={bf1ServerPlayers?.teams[0].image}
              />
              <Typography variant="h4" alignSelf={"center"} marginLeft={1}>
                {bf1ServerPlayers?.teams[0].name}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <PlayerList
              players={bf1ServerPlayers?.teams[0].players ?? []}
              dictionary={dictionary}
            />
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <Grid item marginY={1}>
            <Box display={"flex"}>
              <Box
                component="img"
                height={50}
                alt="Picture of the map"
                src={bf1ServerPlayers?.teams[1].image}
              />
              <Typography variant="h4" alignSelf={"center"} marginLeft={1}>
                {bf1ServerPlayers?.teams[1].name}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <PlayerList
              players={bf1ServerPlayers?.teams[1].players ?? []}
              dictionary={dictionary}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
