"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ServerList } from "./components/ServerList";
import Container from "@mui/material/Container";
import { useBf4serversBf4ServersGet } from "@/api/battlefield-4/battlefield-4";

type Props = {
  servers?: FrostbiteSearch;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const [search, setSearch] = useState("bob");
  const { data: servers, isLoading } = useBf1serversBf1ServersGet(
    {
      name: search,
      limit: 20,
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  const { data: servers1, isLoading: isLoading1 } = useBf4serversBf4ServersGet(
    {
      name: search,
      limit: 20,
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    <>
      <Container maxWidth={false}>
        <SearchBar search={search} setSearch={setSearch} />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <ServerList
            servers={servers?.data?.servers}
            dictionary={dictionary}
          />
        )}
      </Container>
    </>
  );
};
