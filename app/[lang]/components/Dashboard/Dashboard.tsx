"use client";

import { Skeleton, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import { PlayerTable } from "./PlayerTable";
import { DashboardProps, DashboardTeam } from "./dashboard.types";

export const Dashboard = ({
  dictionary,
  isPlayersLoading,
  teamOne,
  teamTwo,
}: DashboardProps) => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const renderListTitle = useCallback(
    (team: DashboardTeam | undefined) => {
      return (
        <Box display={"flex"}>
          {team?.image ? (
            <Box
              component="img"
              height={isLgUp ? 50 : 30}
              alt="Image of the Team"
              src={team?.image}
            />
          ) : (
            <Skeleton variant="rectangular" width={40} height={40} />
          )}
          {team?.name ? (
            <Typography
              variant={`${isLgUp ? "h4" : "h6"}`}
              alignSelf={"center"}
              marginLeft={1}
            >
              {team?.name}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width="50%" height={40} />
          )}
        </Box>
      );
    },
    [isLgUp]
  );

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
          {renderListTitle(teamOne)}
        </Grid>
        <Grid item height={"100%"}>
          <PlayerTable
            isPlayersLoading={isPlayersLoading}
            players={teamOne?.players}
            dictionary={dictionary.player}
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
          {renderListTitle(teamTwo)}
        </Grid>
        <Grid item height={"100%"}>
          <PlayerTable
            isPlayersLoading={isPlayersLoading}
            players={teamTwo?.players}
            dictionary={dictionary.player}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
