import { FrostbiteServerList } from "@/api/model/frostbiteServerList";
import { getDictionary } from "@/get-dictionary";
import { Container, Typography } from "@mui/material";
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
    const num1 = a.serverInfo.split("/");
    const num2 = b.serverInfo.split("/");

    return Number(num2[0]) - Number(num1[0]);
  });

  return (
    <Box marginX={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{dictionary.name}</TableCell>
              <TableCell align="left">{dictionary.map}</TableCell>
              <TableCell align="left">{dictionary.mode}</TableCell>
              <TableCell align="left">{dictionary.player}</TableCell>
              <TableCell align="left">{dictionary.inQue}</TableCell>
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
                  <TableCell align="left">
                    <Box display="flex">
                      <Box
                        component="img"
                        height={50}
                        alt="Picture of the map"
                        src={server.url}
                      />
                      <Box alignSelf="center" marginLeft={1}>
                        {server.currentMap}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{server.mode}</TableCell>
                  <TableCell align="left">{server.serverInfo}</TableCell>
                  <TableCell align="left">{server.inQue}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
