import { Bf1ServerPlayers } from "@/api/model/bf1ServerPlayers";
import { FrostbiteServerTeam } from "@/api/model/frostbiteServerTeam";
import {
  DashboardPlayer,
  DashboardTeam,
} from "@/app/[lang]/components/Dashboard/dashboard.types";
import { CustomApiError } from "@/app/lib/exceptions";
import { AxiosErrorToApiError } from "@/app/tools/Mapper";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { ServerDashboard } from "./client";

const getDashboardTeam = async (team: FrostbiteServerTeam) => {
  const dashboardPlayers: DashboardPlayer[] = team.players.map(
    (p): DashboardPlayer => {
      return {
        id: p.user_id,
        playerid: p.player_id,
      };
    }
  );

  const dashboardTeam: DashboardTeam = {
    image: team.image,
    name: team.name,
    shortName: undefined,
    teamid: team.teamid,
    players: dashboardPlayers,
  };
  return dashboardTeam;
};

export default async function Page({
  params: { lang, gameid },
}: {
  params: { lang: Locale; gameid: string };
}) {
  let bf1ServerPlayers: AxiosResponse<Bf1ServerPlayers, any> | undefined =
    undefined;

  let teamOne: DashboardTeam = {};
  let teamTwo: DashboardTeam = {};

  const client = axios.create({ baseURL: "https://api.gametools.network/" });
  axiosRetry(client, { retries: 3 });

  try {
    bf1ServerPlayers = await client.get<Bf1ServerPlayers>("/bf1/players/", {
      params: {
        gameid: gameid,
      },
    });

    if (bf1ServerPlayers?.data.teams[0] && bf1ServerPlayers?.data.teams[1]) {
      teamOne = await getDashboardTeam(bf1ServerPlayers?.data.teams[0]);
      teamTwo = await getDashboardTeam(bf1ServerPlayers?.data.teams[1]);
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e);
      throw new CustomApiError(JSON.stringify(AxiosErrorToApiError(e)));
    }
  }
  const dictionary = await getDictionary(lang);

  return (
    <ServerDashboard
      dictionary={dictionary}
      teamOne={teamOne}
      teamTwo={teamTwo}
    />
  );
}
