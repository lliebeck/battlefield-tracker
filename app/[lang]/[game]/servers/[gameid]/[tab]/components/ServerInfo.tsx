import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ServerInfoSettingsCard } from "./ServerInfoSettingsCard";
import { getDictionary } from "@/get-dictionary";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const ServerInfo = ({ dictionary }: Props) => {
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
      <Grid container spacing={2}>
        <Grid container item spacing={2} width={"100%"} flexDirection={"row"}>
          <Grid item xs={12}>
            <Box
              component="img"
              maxWidth={"100%"}
              src={serverInfo?.currentMapImage}
            />
          </Grid>
          <Grid item alignSelf={"end"}>
            <Typography variant={"body2"}>{dictionary.map}</Typography>
            <Typography variant={"body1"}>{serverInfo?.currentMap}</Typography>
          </Grid>
          <Grid item alignSelf={"end"}>
            <Typography variant={"body2"}>{dictionary.mode}</Typography>
            <Typography variant={"body1"}>{serverInfo?.mode}</Typography>
          </Grid>
          <Grid item alignSelf={"end"}>
            <Typography variant={"body2"}>{dictionary.player}</Typography>
            <Typography
              variant={"body1"}
            >{`${serverInfo?.playerAmount}/${serverInfo?.maxPlayerAmount}`}</Typography>
          </Grid>
          <Grid item alignSelf={"end"}>
            <Typography variant={"body2"}>{dictionary.inQue}</Typography>
            <Typography variant={"body1"}>{serverInfo?.inQueue}</Typography>
          </Grid>
          <Grid item alignSelf={"end"}>
            <Typography variant={"body2"}>{dictionary.region}</Typography>
            <Typography variant={"body1"}>{serverInfo?.region}</Typography>
          </Grid>
          <Grid item alignSelf={"end"}>
            <Typography variant={"body2"}>{dictionary.owner}</Typography>
            <Typography variant={"body1"}>{serverInfo?.owner?.name}</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            {serverInfo?.settings.Misc && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Misc}
                label={dictionary.settings.extended}
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
                  label={dictionary.settings.vehicles}
                />
              )}
            </Grid>
            <Grid item>
              {serverInfo?.settings.Scales && (
                <ServerInfoSettingsCard
                  value={serverInfo?.settings.Scales}
                  label={dictionary.settings.scales}
                />
              )}
            </Grid>
            <Grid item>
              {serverInfo?.settings.Kits && (
                <ServerInfoSettingsCard
                  value={serverInfo?.settings.Kits}
                  label={dictionary.settings.kits}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {serverInfo?.settings.Weapons && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Weapons}
                label={dictionary.settings.weapons}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
