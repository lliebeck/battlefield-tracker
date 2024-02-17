"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useParams, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { lang } = useParams();

  const { filterOptions } = useServerSearchParams();

  const { data: servers, isLoading } = useBf1serversBf1ServersGet(
    {
      name: filterOptions?.search ?? "",
      limit: 50,
      player_filters: filterOptions?.isEmptyServer
        ? ""
        : "oneToFive,sixToTen,tenPlus,none",
      map_filters: filterOptions?.map ?? undefined,
      lang: lang === "de" ? "de-de" : "en-us",
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    <>
      <Box>
        <SearchBar
          dictionaryMap={dictionaryMaps}
          dictionaryServer={dictionaryServer}
        />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <ServerList
            servers={servers?.data?.servers}
            dictionary={dictionaryServer}
          />
        )}
      </Box>
    </>
  );
};
