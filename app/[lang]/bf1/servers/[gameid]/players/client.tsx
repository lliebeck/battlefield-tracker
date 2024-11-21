"use client";

import { FrostbiteMainStats } from "@/api/model";
import { Dashboard } from "@/app/[lang]/components/Dashboard/Dashboard";
import {
  DashboardPlayer,
  DashboardTeam,
} from "@/app/[lang]/components/Dashboard/dashboard.types";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ICombinedDictionaries } from "../tabs.types";

type Props = {
  dictionary: ICombinedDictionaries;
  teamOne: DashboardTeam;
  teamTwo: DashboardTeam;
};

export const ServerDashboard = ({ dictionary, teamOne, teamTwo }: Props) => {
  const [playersTeamOneLoading, setPlayersTeamOneLoading] =
    useState<boolean>(true);
  const [playersTeamTwoLoading, setPlayersTeamTwoLoading] =
    useState<boolean>(true);

  const isPlayersLoading = useMemo(
    () => playersTeamOneLoading && playersTeamTwoLoading,
    [playersTeamOneLoading, playersTeamTwoLoading]
  );

  const fetchPlayerStats = useCallback(
    async (players: (DashboardPlayer | undefined)[]) => {
      const res: Promise<AxiosResponse<FrostbiteMainStats, any>>[] = [];
      for (const player of players) {
        res.push(
          axios.get<FrostbiteMainStats>(
            `https://api.gametools.network/bf1/stats/`,
            {
              params: {
                playerid: player?.playerid,
                oid: player?.id,
              },
            }
          )
        );
      }
      const responses = await Promise.allSettled(res);
      return responses;
    },
    []
  );

  const getDashboardPlayers = useCallback(
    async (players: (DashboardPlayer | undefined)[] | undefined) => {
      if (!players) return [];
      const fetchPlayerStatsResponse = await fetchPlayerStats(players);
      const mappedPlayers = fetchPlayerStatsResponse.map(
        (playerStats): DashboardPlayer | undefined => {
          let newPlayer: DashboardPlayer;
          if (playerStats.status === "rejected") return undefined;

          const stats = playerStats.value.data;
          newPlayer = {
            id: stats.id,
            avatar: stats.avatar?.toString(),
            userName: stats.userName?.toString(),
            rank: stats.rank,
            rankImg: stats.rankImg,
            accuracy: stats.accuracy,
            avengerKills: stats.avengerKills,
            deaths: stats.deaths,
            dogtagsTaken: stats.dogtagsTaken,
            headshots: stats.headshots,
            headShots: stats.headShots,
            heals: stats.heals,
            infantryKillDeath: stats.infantryKillDeath,
            infantryKillsPerMinute: stats.infantryKillsPerMinute,
            killAssists: stats.killAssists,
            killDeath: stats.killDeath,
            kills: stats.kills,
            killsPerMinute: stats.killsPerMinute,
            longestHeadShot: stats.longestHeadShot,
            loses: stats.loses,
            revives: stats.revives,
            roundsPlayed: stats.roundsPlayed,
            saviorKills: stats.saviorKills,
            scorePerMinute: stats.scorePerMinute,
            secondsPlayed: stats.secondsPlayed,
            skill: stats.skill,
            squadScore: stats.squadScore,
            timePlayed: stats.timePlayed,
            totalRankProgress: stats.totalRankProgress,
            winPercent: stats.winPercent,
            wins: stats.wins,
            rankName: "",
          };
          return newPlayer;
        }
      );
      return mappedPlayers;
    },
    [fetchPlayerStats]
  );

  const [teamOnePlayers, setTeamOnePlayers] = useState<DashboardTeam>(teamOne);

  const [teamTwoPlayers, setTeamTwoPlayers] = useState<DashboardTeam>(teamTwo);

  useEffect(() => {
    const fetch = async () => {
      const newPlayers = await getDashboardPlayers(teamOne.players);
      if (newPlayers.length > 0) {
        setTeamOnePlayers((prev) => {
          return {
            ...prev,
            players: newPlayers,
          };
        });
        setPlayersTeamOneLoading(false);
      }
    };
    fetch();
  }, [getDashboardPlayers, teamOne, teamOne.players]);

  useEffect(() => {
    const fetch = async () => {
      const newPlayers = await getDashboardPlayers(teamTwo.players);
      if (newPlayers.length > 0) {
        setTeamTwoPlayers((prev) => {
          return {
            ...prev,
            players: newPlayers,
          };
        });
        setPlayersTeamTwoLoading(false);
      }
    };
    fetch();
  }, [getDashboardPlayers, teamTwo.players]);

  return (
    <Dashboard
      isPlayersLoading={isPlayersLoading}
      dictionary={dictionary}
      teamOne={teamOnePlayers}
      teamTwo={teamTwoPlayers}
    />
  );
};
