"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { SearchBar } from "./components/SearchBar";
import { ServerList } from "./components/ServerList";
import { useServerSearchParams } from "./hooks/useServerSearchParams";

type Props = {
  servers?: FrostbiteSearch;
  dictionaryServer: Awaited<ReturnType<typeof getDictionary>>["server"];
  dictionaryMaps: Awaited<ReturnType<typeof getDictionary>>["maps"];
};

export const Client = ({
  servers: initialServers,
  dictionaryServer,
  dictionaryMaps,
}: Props) => {
  const { lang } = useParams();

  const { filterOptions } = useServerSearchParams();

  const {
    data: servers,
    isLoading,
    error,
  } = useBf1serversBf1ServersGet(
    {
      name: filterOptions?.search ?? "",
      limit: 50,
      player_filters: filterOptions?.isEmptyServer
        ? ""
        : "oneToFive,sixToTen,tenPlus,none",
      map_filters: filterOptions?.map ?? undefined,
      lang: lang.toString() ?? "en-us",
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    //Substract custom app bar height (64px)
    <Box height={`calc(100% - 64px)`}>
      <SearchBar
        dictionaryMap={dictionaryMaps}
        dictionaryServer={dictionaryServer}
      />
      <ServerList
        servers={servers?.data?.servers}
        dictionary={dictionaryServer}
        isLoading={isLoading}
        hasError={error !== null}
      />
    </Box>
  );
};
