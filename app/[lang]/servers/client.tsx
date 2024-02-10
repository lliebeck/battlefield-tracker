"use client";

import { useBf1serversBf1ServersGet } from "@/api/battlefield-1/battlefield-1";
import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { FrostbiteServerList } from "@/api/model/frostbiteServerList";
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
import { AxiosResponse } from "axios";

type Props = {
  servers?: AxiosResponse<FrostbiteSearch, any>;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ servers, dictionary }: Props) => {
  const { data: server, isLoading } = useBf1serversBf1ServersGet(
    {
      name: "bob",
    },
    { query: { initialData: servers } }
  );

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    // <pre>{JSON.stringify(server, undefined, 2)}</pre>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{dictionary.name}</TableCell>
            <TableCell align="right">{dictionary.map}</TableCell>
            <TableCell align="right">{dictionary.mode}</TableCell>
            <TableCell align="right">{dictionary.player}</TableCell>
            <TableCell align="right">{dictionary.inQue}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {server?.data?.servers?.map((server) => {
            return (
              <TableRow
                key={server.gameId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {server.prefix}
                </TableCell>
                <TableCell align="right">{server.currentMap}</TableCell>
                <TableCell align="right">{server.mode}</TableCell>
                <TableCell align="right">{server.serverInfo}</TableCell>
                <TableCell align="right">{server.inQue}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
