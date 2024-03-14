import { FrostbiteServerList } from "@/api/model/frostbiteServerList";
import { HTTPValidationError } from "@/api/model/hTTPValidationError";
import { getDictionary } from "@/get-dictionary";
import { Container, LinearProgress, Typography } from "@mui/material";
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
  isLoading: boolean;
  hasError: boolean;
};

export const ServerList = ({
  servers,
  dictionary,
  isLoading,
  hasError,
}: Props) => {
  const router = useRouter();

  servers?.sort((a, b) => {
    const num1 = a.serverInfo.split("/");
    const num2 = b.serverInfo.split("/");

    return Number(num2[0]) - Number(num1[0]);
  });

  return (
    //Substract searchbar (72px)
    <Box marginX={3} height={`calc(100% - 72px - 5px)`}>
      {isLoading && <LinearProgress />}
      {hasError && (
        <Typography variant="h6">{dictionary.somethingWentWrong}</Typography>
      )}
      {!isLoading && !hasError && (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "100%",
          }}
        >
          <Table
            size="small"
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            stickyHeader
          >
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
              {servers && servers?.length < 1 ? (
                <Typography m={1} variant="body1">
                  {dictionary.noServersFound}
                </Typography>
              ) : (
                servers?.map((server) => {
                  return (
                    <TableRow
                      key={server.gameId}
                      hover
                      onClick={() => router.push(`servers/${server.gameId}`)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box display="flex">
                          <Box
                            component="img"
                            height={50}
                            alt="Picture of the map"
                            src={server.url}
                          />
                          <Box alignSelf="center" marginLeft={1}>
                            {server.prefix}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{server.currentMap}</TableCell>
                      <TableCell align="left">{server.mode}</TableCell>
                      <TableCell align="left">{server.serverInfo}</TableCell>
                      <TableCell align="left">{server.inQue}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
