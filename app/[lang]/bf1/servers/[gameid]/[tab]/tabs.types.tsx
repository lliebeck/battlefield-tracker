import { getDictionary } from "@/get-dictionary";

export const enum ServerRoutes {
  PLAYERS = "players",
  INFO = "info",
}

export type ICombinedDictionaries = {
  general: Awaited<ReturnType<typeof getDictionary>>["general"];
  server: Awaited<ReturnType<typeof getDictionary>>["server"];
  player: Awaited<ReturnType<typeof getDictionary>>["player"];
  maps: Awaited<ReturnType<typeof getDictionary>>["maps"];
};
