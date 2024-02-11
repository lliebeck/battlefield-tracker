"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ServerList } from "./components/ServerList";

type Props = {
  servers?: AxiosResponse<FrostbiteSearch, any>;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const [search, setSearch] = useState("bob");
  const { data: servers, isLoading } = useBf1serversBf1ServersGet(
    {
      name: search,
    },
    { query: { initialData: initialServers } }
  );

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ServerList servers={servers?.data?.servers} dictionary={dictionary} />
      )}
    </>
  );
};
