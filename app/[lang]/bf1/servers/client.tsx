"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { ServerList } from "../../components/ServerList";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { bf1MapOptionKeys } from "./types/bf1.types";
import { useServerSearchParams } from "../../hooks/useServerSearchParams";
import { useEffect } from "react";

type Props = {
  servers?: FrostbiteSearch;
  dictionary: {
    server: Awaited<ReturnType<typeof getDictionary>>["server"];
    maps: Awaited<ReturnType<typeof getDictionary>>["maps"];
  };
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const { lang } = useParams();

  const { filterOptions } = useServerSearchParams(bf1MapOptionKeys);

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
      region: filterOptions?.region ?? "eu",
      lang: lang.toString() ?? "en-us",
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    //Substract custom app bar height (64px)
    <Box height={`calc(100% - 64px)`}>
      <SearchBar dictionary={dictionary} mapOptionKeys={bf1MapOptionKeys} />
      <ServerList
        servers={servers?.data?.servers}
        dictionary={dictionary.server}
        isLoading={isLoading}
        hasError={error !== null}
      />
    </Box>
  );
};
