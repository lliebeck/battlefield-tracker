import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import Box from "@mui/material/Box";
import Grid, { RegularBreakpoints } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ServerInfoGridItem } from "./ServerInfoItem";
import LinearProgress from "@mui/material/LinearProgress";

export const ServerInfo = () => {
  const { gameid } = useParams();
  const { data, isLoading } = useBf1detailedserversBf1DetailedserverGet(
    {
      gameid: gameid as string,
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  const serverInfo = useMemo(() => data?.data, [data?.data]);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box marginTop={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
              <Box
                component="img"
                maxWidth={180}
                alt=""
                src={serverInfo?.currentMapImage}
              />
            </Grid>
            <ServerInfoGridItem
              xs={12}
              sm={6}
              md={2}
              label="Map"
              value={serverInfo?.currentMap}
            />
            <ServerInfoGridItem
              xs={12}
              sm={6}
              md={2}
              label="Mode"
              value={serverInfo?.mode}
            />
            <ServerInfoGridItem
              xs={12}
              sm={6}
              md={1}
              label="Players"
              value={`${serverInfo?.playerAmount}/${serverInfo?.maxPlayerAmount}`}
            />
            <ServerInfoGridItem
              xs={12}
              sm={6}
              md={1}
              label="Queue"
              value={serverInfo?.inQueue}
            />
            <ServerInfoGridItem
              xs={12}
              sm={6}
              md={1}
              label="Region"
              value={serverInfo?.region}
            />
            <ServerInfoGridItem
              xs={12}
              sm={6}
              md={2}
              label="Owner"
              value={serverInfo?.owner.name}
            />
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
      {/* <pre>{JSON.stringify(serverInfo, undefined, 2)}</pre> */}
    </Box>
  );
};
