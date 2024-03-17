import { PlatoonResult } from "@/api/model/platoonResult";
import { ServerOwner } from "@/api/model/serverOwner";
import { ServerRotation } from "@/api/model/serverRotation";
import { ServerSettings } from "@/api/model/serverSettings";
import { ServerTeams } from "@/api/model/serverTeams";

export type IServerInfo = {
  country: string;
  currentMap: string;
  currentMapImage: string;
  description: string;
  favorites: number;
  gameId: string;
  inQueue: number;
  maxPlayerAmount: number;
  mode: string;
  official: boolean;
  owner: ServerOwner;
  platform: string;
  playerAmount: number;
  prefix: string;
  region: string;
  rotation: ServerRotation[];
  serverId: string;
  settings: ServerSettings;
  smallmode: string;
  teams: ServerTeams;
  platoon?: PlatoonResult;
};
