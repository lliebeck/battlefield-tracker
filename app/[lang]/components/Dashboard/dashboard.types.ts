import { FrostbiteMainStats } from "@/api/model/frostbiteMainStats";
import { FrostbiteMainStatsAvatar } from "@/api/model/frostbiteMainStatsAvatar";
import { FrostbiteMainStatsUserId } from "@/api/model/frostbiteMainStatsUserId";
import { FrostbiteMainStatsUserName } from "@/api/model/frostbiteMainStatsUserName";
import { FrostbiteServerPlayer } from "@/api/model/frostbiteServerPlayer";
import { HTTPValidationError } from "@/api/model/hTTPValidationError";
import { ICombinedDictionaries } from "../../types/dictionary.types";
import { AxiosError } from "axios";

export type AdvancedPlayer = {
  status: "ok" | "loading" | "error";
  basicData: FrostbiteServerPlayer;
  advancedData: FrostbiteMainStats | undefined;
};

export type DashboardProps = {
  isLoading: boolean;
  error: AxiosError<HTTPValidationError, any> | null;
  teamOne: DashboardTeam | undefined;
  teamTwo: DashboardTeam | undefined;
  dictionary: ICombinedDictionaries;
};

export type DashboardTeam = {
  teamid?: string;
  image?: string;
  name?: string;
  players?: DashboardPlayerResponse[];
};

export type DashboardPlayerResponse = {
  id: number;
  name: string;
  avatar: string | undefined;
  rankImg: string | undefined;
  rank: number | undefined;
  status: "ok" | "loading" | "error";
  data?: DashboardPlayer;
};

export type DashboardPlayer = {
  accuracy: number;
  avatar?: FrostbiteMainStatsAvatar;
  avengerKills: number;
  deaths: number;
  dogtagsTaken: number;
  headshots: number;
  headShots: number;
  heals: number;
  id: number;
  infantryKillDeath: number;
  infantryKillsPerMinute: number;
  killAssists: number;
  killDeath: number;
  kills: number;
  killsPerMinute: number;
  longestHeadShot: number;
  loses: number;
  rank: number;
  rankImg: string;
  rankName: string;
  revives: number;
  roundsPlayed: number;
  saviorKills: number;
  scorePerMinute: number;
  secondsPlayed: number;
  skill: number;
  squadScore: number;
  timePlayed: string;
  totalRankProgress: number;
  userId?: FrostbiteMainStatsUserId;
  userName?: FrostbiteMainStatsUserName;
  winPercent: number;
  wins: number;
};
