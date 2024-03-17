"use client";

import { useBfvplayersBfvPlayersGet } from "@/api/battlefield-5/battlefield-5";
import {
  BfvMainStats,
  FrostbiteMainStats,
  FrostbiteServerPlayer,
} from "@/api/model";
import { Dashboard } from "@/app/[lang]/components/Dashboard/Dashboard";
import {
  DashboardPlayer,
  DashboardPlayerResponse,
  DashboardTeam,
} from "@/app/[lang]/components/Dashboard/dashboard.types";
import { useMediaQuery, useTheme } from "@mui/material";
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
import { ICombinedDictionaries } from "../tabs.types";

type Props = {
  dictionary: ICombinedDictionaries;
};

export const ServerDashboard = ({ dictionary }: Props) => {
  const { gameid } = useParams();
  const {
    data: bf5ServerPlayers,
    isLoading,
    error,
  } = useBfvplayersBfvPlayersGet(
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

  // const teamOne = useMemo(
  //   () => bf5ServerPlayers?.data.teams[0],
  //   [bf5ServerPlayers?.data.teams]
  // );

  // const teamTwo = useMemo(
  //   () => bf5ServerPlayers?.data.teams[1],
  //   [bf5ServerPlayers?.data.teams]
  // );

  const mapBf1Player = useCallback(
    (playerStats: BfvMainStats): DashboardPlayer => {
      const AdvancedPlayer: DashboardPlayer = {
        accuracy: playerStats.accuracy,
        avengerKills: playerStats.avengerKills,
        deaths: playerStats.deaths,
        dogtagsTaken: playerStats.dogtagsTaken,
        headshots: playerStats.headshots,
        headShots: playerStats.headShots,
        heals: playerStats.heals,
        id: playerStats.id,
        infantryKillDeath: playerStats.infantryKillDeath,
        infantryKillsPerMinute: playerStats.infantryKillsPerMinute,
        killAssists: playerStats.killAssists,
        killDeath: playerStats.killDeath,
        kills: playerStats.kills,
        killsPerMinute: playerStats.killsPerMinute,
        longestHeadShot: playerStats.longestHeadShot,
        loses: playerStats.loses,
        rank: playerStats.rank,
        rankImg: playerStats.rankImg,
        revives: playerStats.revives,
        roundsPlayed: playerStats.roundsPlayed,
        saviorKills: playerStats.saviorKills,
        scorePerMinute: playerStats.scorePerMinute,
        secondsPlayed: playerStats.secondsPlayed,
        skill: playerStats.skill,
        squadScore: playerStats.squadScore,
        timePlayed: playerStats.timePlayed,
        totalRankProgress: playerStats.totalRankProgress,
        winPercent: playerStats.winPercent,
        wins: playerStats.wins,
        rankName: "",
      };
      return AdvancedPlayer;
    },
    []
  );

  const getUpdateTeamData = useCallback(
    (
      currentTeamData: DashboardTeam | undefined,
      newPlayerData: BfvMainStats,
      hasError: boolean
    ): DashboardTeam | undefined => {
      if (!currentTeamData) return;
      const newTeam: DashboardTeam = {
        image: currentTeamData.image,
        name: currentTeamData.name,
        teamid: currentTeamData.teamid,
        players: currentTeamData?.players?.map((p) => {
          return p.id === newPlayerData?.userId
            ? {
                status: "ok",
                id: p.id,
                name: p.name,
                avatar: newPlayerData?.avatar?.toString(),
                rank: newPlayerData?.rank,
                rankImg: newPlayerData?.rankImg,
                data: mapBf1Player(newPlayerData),
              }
            : p;
        }),
      };
      return newTeam;
    },
    [mapBf1Player]
  );

  const inititalTeamOnePlayers: DashboardTeam | undefined = useMemo(() => {
    if (isLoading) return;
    const teamOnePlayers = bf5ServerPlayers?.data.teams[0]?.players.map(
      (player) => {
        const dashboardPlayerResponse: DashboardPlayerResponse = {
          id: player.user_id,
          name: player.name,
          avatar: "",
          rank: player.rank,
          rankImg: "",
          status: "loading",
          data: undefined,
        };
        return dashboardPlayerResponse;
      }
    );
    const DashboardTeam: DashboardTeam = {
      teamid: bf5ServerPlayers?.data.teams[0]?.teamid,
      image: bf5ServerPlayers?.data.teams[0]?.image,
      name: bf5ServerPlayers?.data.teams[0]?.name,
      players: teamOnePlayers,
    };
    return DashboardTeam;
  }, [bf5ServerPlayers?.data.teams, isLoading]);

  const inititalTeamTwoPlayers: DashboardTeam | undefined = useMemo(() => {
    if (isLoading) return;
    const players = bf5ServerPlayers?.data.teams[1].players.map((player) => {
      const dashboardPlayerResponse: DashboardPlayerResponse = {
        id: player.user_id,
        name: player.name,
        avatar: "",
        rank: player.rank,
        rankImg: "",
        status: "loading",
        data: undefined,
      };
      return dashboardPlayerResponse;
    });
    const DashboardTeam: DashboardTeam = {
      teamid: bf5ServerPlayers?.data.teams[1].teamid,
      image: bf5ServerPlayers?.data.teams[1].image,
      name: bf5ServerPlayers?.data.teams[1].name,
      players: players,
    };
    return DashboardTeam;
  }, [bf5ServerPlayers?.data.teams, isLoading]);

  const [teamOnePlayers, setTeamOnePlayers] = useState<
    DashboardTeam | undefined
  >(inititalTeamOnePlayers);

  const [teamTwoPlayers, setTeamTwoPlayers] = useState<
    DashboardTeam | undefined
  >(inititalTeamTwoPlayers);

  const fetchPlayerStats = useCallback(
    async (
      players: FrostbiteServerPlayer[] | undefined,
      inititalAdvancedPlayers: DashboardTeam | undefined,
      setNewPlayers: Dispatch<SetStateAction<DashboardTeam | undefined>>
    ) => {
      if (!players) return;
      for (const player of players) {
        let res: AxiosResponse<BfvMainStats, any>;
        try {
          res = await axios.get<BfvMainStats>(
            `https://api.gametools.network/bfv/stats/?oid=${player.user_id}`
          );
        } catch (ex) {
        } finally {
          setNewPlayers((prev) =>
            prev
              ? getUpdateTeamData(prev, res?.data, false)
              : getUpdateTeamData(inititalAdvancedPlayers, res?.data, false)
          );
        }
      }
    },
    [getUpdateTeamData]
  );

  useEffect(() => {
    if (isLoading) return;
    fetchPlayerStats(
      bf5ServerPlayers?.data.teams[0]?.players,
      inititalTeamOnePlayers,
      setTeamOnePlayers
    );
  }, [
    bf5ServerPlayers?.data.teams,
    fetchPlayerStats,
    inititalTeamOnePlayers,
    isLoading,
  ]);

  useEffect(() => {
    if (isLoading) return;
    fetchPlayerStats(
      bf5ServerPlayers?.data.teams[1].players,
      inititalTeamTwoPlayers,
      setTeamTwoPlayers
    );
  }, [
    bf5ServerPlayers?.data.teams,
    fetchPlayerStats,
    inititalTeamTwoPlayers,
    isLoading,
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
    <Dashboard
      dictionary={dictionary}
      error={error}
      isLoading={isLoading}
      teamOne={teamOnePlayers}
      teamTwo={teamTwoPlayers}
    />
  );
};
