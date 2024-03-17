"use client";

import { useBf1playersBf1PlayersGet } from "@/api/battlefield-1/battlefield-1";
import {
  Bf1Combined,
  FrostbiteMainStats,
  FrostbiteServerPlayer,
} from "@/api/model";
import { getDictionary } from "@/get-dictionary";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PlayerList } from "./components/PlayerList";
import { ICombinedDictionaries } from "../tabs.types";

type Props = {
  dictionary: ICombinedDictionaries;
};

export type AdvancedPlayer = {
  status: "ok" | "loading" | "error";
  basicData: FrostbiteServerPlayer;
  advancedData: FrostbiteMainStats | undefined;
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

  const inititalAdvancedTeamOnePlayers: AdvancedPlayer[] | undefined = useMemo(
    () =>
      teamOne?.players.map((player) => {
        const AdvancedPlayer: AdvancedPlayer = {
          status: "loading",
          basicData: player,
          advancedData: undefined,
        };
        return AdvancedPlayer;
      }),
    [teamOne?.players]
  );

  const inititalAdvancedTeamTwoPlayers: AdvancedPlayer[] | undefined = useMemo(
    () =>
      teamTwo?.players.map((player) => {
        const AdvancedPlayer: AdvancedPlayer = {
          status: "loading",
          basicData: player,
          advancedData: undefined,
        };
        return AdvancedPlayer;
      }),
    [teamTwo?.players]
  );

  const [teamOnePlayers, setTeamOnePlayers] = useState<
    AdvancedPlayer[] | undefined
  >(inititalAdvancedTeamOnePlayers);

  const [teamTwoPlayers, setTeamTwoPlayers] = useState<
    AdvancedPlayer[] | undefined
  >(inititalAdvancedTeamTwoPlayers);

  const fetchAdvancedPlayerStats = useCallback(
    async (
      players: FrostbiteServerPlayer[] | undefined,
      inititalAdvancedPlayers: AdvancedPlayer[] | undefined,
      setNewPlayers: Dispatch<SetStateAction<AdvancedPlayer[] | undefined>>
    ) => {
      if (!players) return;
      for (const player of players) {
        let res: AxiosResponse<Bf1Combined, any>;
        try {
          res = await axios.get<Bf1Combined>(
            `https://api.gametools.network/bf1/stats/?playerid=${player.player_id}`
          );
        } catch (ex) {
        } finally {
          setNewPlayers((prev) =>
            prev
              ? prev?.map((p) =>
                  p.basicData.player_id === player.player_id
                    ? {
                        status: res ? "ok" : "error",
                        basicData: p.basicData,
                        advancedData: res?.data,
                      }
                    : p
                )
              : inititalAdvancedPlayers?.map((p) =>
                  p.basicData.player_id === player.player_id
                    ? {
                        status: res ? "ok" : "error",
                        basicData: p.basicData,
                        advancedData: res?.data,
                      }
                    : p
                )
          );
        }
      }
    },
    []
  );

  useEffect(() => {
    fetchAdvancedPlayerStats(
      teamOne?.players,
      inititalAdvancedTeamOnePlayers,
      setTeamOnePlayers
    );
  }, [
    fetchAdvancedPlayerStats,
    inititalAdvancedTeamOnePlayers,
    teamOne,
    teamOne?.players,
  ]);

  useEffect(() => {
    fetchAdvancedPlayerStats(
      teamTwo?.players,
      inititalAdvancedTeamTwoPlayers,
      setTeamTwoPlayers
    );
  }, [
    fetchAdvancedPlayerStats,
    inititalAdvancedTeamTwoPlayers,
    teamTwo?.players,
  ]);

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
          <PlayerList players={teamOnePlayers} dictionary={dictionary.player} />
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
          <PlayerList players={teamTwoPlayers} dictionary={dictionary.player} />
        </Grid>
      </Grid>
    </Grid>
  );
};
