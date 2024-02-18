import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import Box from "@mui/material/Box";
import Grid, { RegularBreakpoints } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ServerInfoGridItem } from "./ServerInfoItem";
import LinearProgress from "@mui/material/LinearProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { ServerInfoSettingsCard } from "./ServerInfoSettingsCard";

export const ServerInfo = () => {
  const { gameid, lang } = useParams();
  const { data, isLoading } = useBf1detailedserversBf1DetailedserverGet(
    {
      gameid: gameid as string,
      lang: lang === "de" ? "de-de" : "en-us",
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  const theme = useTheme();
  const serverInfo = useMemo(() => data?.data, [data?.data]);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box marginTop={1}>
      <Grid container spacing={1} xs={12} sm={8} md={10} lg={8} xl={6}>
        <Grid item xs={12} sm={12} md={3}>
          <Box
            component="img"
            maxWidth={isDownMd ? "100%" : 180}
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
          alignValue="right"
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
          value={serverInfo?.owner?.name}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5}>
          {serverInfo?.settings.Misc && (
            <ServerInfoSettingsCard
              value={serverInfo?.settings.Misc}
              label="Extended"
            />
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          flexDirection={"column"}
          spacing={2}
        >
          <Grid item>
            {serverInfo?.settings.Vehicles && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Vehicles}
                label="Vehicles"
              />
            )}
          </Grid>
          <Grid item>
            {serverInfo?.settings.Scales && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Scales}
                label="Scales"
              />
            )}
          </Grid>
          <Grid item>
            {serverInfo?.settings.Kits && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Kits}
                label="Kits"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {serverInfo?.settings.Weapons && (
            <ServerInfoSettingsCard
              value={serverInfo?.settings.Weapons}
              label="Weapons"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
