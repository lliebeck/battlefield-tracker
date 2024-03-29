"use client";

import {
  BfvMainStats,
  BfvServerPlayers,
  FrostbiteServerPlayer,
} from "@/api/model";
import { Dashboard } from "@/app/[lang]/components/Dashboard/Dashboard";
import {
  DashboardPlayer,
  DashboardPlayerResponse,
  DashboardTeam,
} from "@/app/[lang]/components/Dashboard/dashboard.types";
import axios, { AxiosResponse } from "axios";
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
  bf5ServerPlayers?: BfvServerPlayers;
};

export const ServerDashboard = ({ dictionary, bf5ServerPlayers }: Props) => {
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

  const getUpdateTeamDataParallel = useCallback(
    (
      currentTeamData: DashboardTeam | undefined,
      newPlayerData: PromiseSettledResult<AxiosResponse<BfvMainStats, any>>[]
    ): DashboardTeam | undefined => {
      const newTeam: DashboardTeam = {
        ...currentTeamData,
        players: currentTeamData?.players?.map((player) => {
          const newPlayer = newPlayerData.find((x) => {
            if (x.status === "rejected") return;
            return x.value.data.userId === player.id;
          });

          if (newPlayer?.status === "rejected" || !newPlayer) return player;

          const updtedDashboardPlayer: DashboardPlayerResponse = {
            avatar: newPlayer.value.data.avatar ?? player.avatar,
            id: player.id,
            name: newPlayer.value.data.userName ?? player.name,
            rank: newPlayer.value.data.rank ?? player.rank,
            rankImg: newPlayer.value.data.rankImg ?? player.rankImg,
            status: newPlayer.value.data ? "ok" : "error",
            data: mapBf1Player(newPlayer?.value.data),
          };
          return updtedDashboardPlayer;
        }),
      };
      return newTeam;
    },
    [mapBf1Player]
  );

  const inititalTeamOnePlayers: DashboardTeam | undefined = useMemo(() => {
    const teamOnePlayers = bf5ServerPlayers?.teams[0]?.players.map((player) => {
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
      teamid: bf5ServerPlayers?.teams[0]?.teamid,
      image: bf5ServerPlayers?.teams[0]?.image,
      name: bf5ServerPlayers?.teams[0]?.name,
      players: teamOnePlayers,
    };
    return DashboardTeam;
  }, [bf5ServerPlayers?.teams]);

  const inititalTeamTwoPlayers: DashboardTeam | undefined = useMemo(() => {
    const players = bf5ServerPlayers?.teams[1].players.map((player) => {
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
      teamid: bf5ServerPlayers?.teams[1].teamid,
      image: bf5ServerPlayers?.teams[1].image,
      name: bf5ServerPlayers?.teams[1].name,
      players: players,
    };
    return DashboardTeam;
  }, [bf5ServerPlayers?.teams]);

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
      try {
        const res: Promise<AxiosResponse<BfvMainStats, any>>[] = [];
        for (const player of players) {
          res.push(
            axios.get<BfvMainStats>(
              `https://api.gametools.network/bfv/stats/?oid=${player.user_id}`
            )
          );
        }
        const responses = await Promise.allSettled(res);

        setNewPlayers((prev) =>
          prev
            ? getUpdateTeamDataParallel(prev, responses)
            : getUpdateTeamDataParallel(inititalAdvancedPlayers, responses)
        );
      } catch (ex) {}
    },
    [getUpdateTeamDataParallel]
  );

  useEffect(() => console.log(bf5ServerPlayers), [bf5ServerPlayers]);

  useEffect(() => {
    fetchPlayerStats(
      bf5ServerPlayers?.teams[0]?.players,
      inititalTeamOnePlayers,
      setTeamOnePlayers
    );
  }, [bf5ServerPlayers?.teams, fetchPlayerStats, inititalTeamOnePlayers]);

  useEffect(() => {
    fetchPlayerStats(
      bf5ServerPlayers?.teams[1].players,
      inititalTeamTwoPlayers,
      setTeamTwoPlayers
    );
  }, [bf5ServerPlayers?.teams, fetchPlayerStats, inititalTeamTwoPlayers]);

  return (
    <Dashboard
      dictionary={dictionary}
      teamOne={teamOnePlayers}
      teamTwo={teamTwoPlayers}
    />
  );
};
