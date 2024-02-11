import { FrostbiteServerList } from "@/api/model/frostbiteServerList";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";

type Props = {
  servers: FrostbiteServerList[] | undefined;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const ServerList = ({ servers, dictionary }: Props) => {
  const router = useRouter();

  servers?.sort((a, b) => {
    const nameA = a.serverInfo.toUpperCase(); // ignore upper and lowercase
    const nameB = b.serverInfo.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }

    // names must be equal
    return 0;
  });

  return (
    <Box marginLeft={3}>
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
            {servers?.map((server) => {
              return (
                <TableRow
                  key={server.gameId}
                  hover
                  onClick={() => router.push(`servers/${server.gameId}`)}
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
    </Box>
  );
};
