"use client";

import { Skeleton, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { PlayerTable } from "./PlayerTable";
import { DashboardProps, DashboardTeam } from "./dashboard.types";
import { useCallback, useMemo } from "react";

export const Dashboard = ({
  dictionary,
  error,
  isLoading,
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
          {renderListTitle(teamOne)}
        </Grid>
        <Grid item height={"100%"}>
          <PlayerTable
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
            players={teamTwo?.players}
            dictionary={dictionary.player}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
