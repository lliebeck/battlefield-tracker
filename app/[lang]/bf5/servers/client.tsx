"use client";

import { useBfvserversBfvServersGet } from "@/api/battlefield-5/battlefield-5";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { ServerList } from "../../components/ServerList";
import { useServerSearchParams } from "../../hooks/useServerSearchParams";
import { bf5MapOptionKeys } from "./types/bf5.types";

type Props = {
  servers?: FrostbiteSearch;
  dictionary: {
    server: Awaited<ReturnType<typeof getDictionary>>["server"];
    maps: Awaited<ReturnType<typeof getDictionary>>["maps"];
  };
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const { lang } = useParams();

  const { filterOptions } = useServerSearchParams(bf5MapOptionKeys);

  const {
    data: servers,
    isLoading,
    error,
  } = useBfvserversBfvServersGet(
    {
      name: filterOptions?.search ?? "",
      limit: 50,
      player_filters: filterOptions?.isEmptyServer
        ? ""
        : "oneToFive,sixToTen,tenPlus,none",
      map_filters: filterOptions?.map ?? undefined,
      region: filterOptions?.region ?? "eu",
      lang: lang?.toString() ?? "en-us",
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    //Substract custom app bar height (64px)
    <Box height={`calc(100% - 64px)`}>
      <SearchBar dictionary={dictionary} mapOptionKeys={bf5MapOptionKeys} />
      <ServerList
        servers={servers?.data?.servers}
        dictionary={dictionary.server}
        isLoading={isLoading}
        hasError={error !== null}
      />
    </Box>
  );
};
