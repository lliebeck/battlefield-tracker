"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useMemo, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ServerList } from "./components/ServerList";
import Container from "@mui/material/Container";
import { useParams, useSearchParams } from "next/navigation";

type Props = {
  servers?: FrostbiteSearch;
  dictionaryServer: Awaited<ReturnType<typeof getDictionary>>["server"];
  dictionaryMaps: Awaited<ReturnType<typeof getDictionary>>["maps"];
};

type FilterOptions = {
  search?: string;
  map?: string;
  isEmptyServer?: boolean;
};

export const Client = ({
  servers: initialServers,
  dictionaryServer,
  dictionaryMaps,
}: Props) => {
  const searchParams = useSearchParams();
  const { lang } = useParams();

  let currentSearch = useMemo(() => searchParams.get("search"), [searchParams]);
  let currentMap = useMemo(() => searchParams.get("map"), [searchParams]);
  let currentIsEmptyServer = useMemo(
    () => searchParams.get("isEmptyServer"),
    [searchParams]
  );

  const filterOptions: FilterOptions | undefined = useMemo(() => {
    let options: FilterOptions = {};

    if (!currentSearch && !currentMap && !currentIsEmptyServer) return;

    if (currentSearch) {
      options.search = currentSearch;
    }

    if (currentMap) {
      options.map = currentMap;
    }

    if (currentIsEmptyServer) {
      options.isEmptyServer = currentIsEmptyServer === "true" ? true : false;
    }

    return options;
  }, [currentIsEmptyServer, currentMap, currentSearch]);

  const { data: servers, isLoading } = useBf1serversBf1ServersGet(
    {
      name: filterOptions?.search ?? "",
      limit: 50,
      player_filters: filterOptions?.isEmptyServer
        ? ""
        : "oneToFive,sixToTen,tenPlus,none",
      map_filters: filterOptions?.map,
      lang: lang === "de" ? "de-de" : "en-us",
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    <>
      <Container maxWidth={false}>
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
      </Container>
    </>
  );
};
