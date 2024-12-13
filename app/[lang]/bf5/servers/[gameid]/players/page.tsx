import { BfvServerPlayers } from "@/api/model/bfvServerPlayers";
import { BfvServerTeam } from "@/api/model/bfvServerTeam";
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

const getDashboardTeam = async (team: BfvServerTeam) => {
  const dashboardPlayers: DashboardPlayer[] = team.players.map(
    (p): DashboardPlayer => {
      return {
        id: p.user_id,
      };
    }
  );

  const dashboardTeam: DashboardTeam = {
    image: team.image,
    name: team.name,
    shortName: team.shortName,
    teamid: team.teamid,
    players: dashboardPlayers,
  };
  return dashboardTeam;
};

export default async function Page(
  props: {
    params: Promise<{ lang: Locale; gameid: string }>;
  }
) {
  const params = await props.params;

  const {
    lang,
    gameid
  } = params;

  let bf5ServerPlayers: AxiosResponse<BfvServerPlayers, any> | undefined =
    undefined;

  let teamOne: DashboardTeam = {};
  let teamTwo: DashboardTeam = {};

  const client = axios.create({ baseURL: "https://api.gametools.network/" });
  axiosRetry(client, { retries: 3 });

  try {
    bf5ServerPlayers = await client.get<BfvServerPlayers>("/bfv/players/", {
      params: {
        gameid: gameid,
      },
    });

    if (bf5ServerPlayers?.data.teams[0] && bf5ServerPlayers?.data.teams[1]) {
      teamOne = await getDashboardTeam(bf5ServerPlayers?.data.teams[0]);
      teamTwo = await getDashboardTeam(bf5ServerPlayers?.data.teams[1]);
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
