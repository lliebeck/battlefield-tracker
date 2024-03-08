import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import { Bf1DetailedServerInfo } from "@/api/model";
import { getDictionary } from "@/get-dictionary";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "next/navigation";
import { ServerInfoSettingsCard } from "./components/ServerInfoSettingsCard";
import { GeneralServerInfo } from "./components/GeneralServerInfol";
import { ServerInfoSettings } from "./components/ServerInfoSettings";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const ServerInfo = ({ dictionary }: Props) => {
  const { gameid, lang } = useParams();
  const { data: serverInfo, isLoading } =
    useBf1detailedserversBf1DetailedserverGet(
      {
        gameid: gameid as string,
        lang: lang === "de" ? "de-de" : "en-us",
      },
      { query: { select: (x) => x.data } }
      // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );
  const minWidth = "500px";

  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box marginTop={1}>
      <Grid container spacing={2} flexDirection={"row"} minWidth={minWidth}>
        <Grid item minWidth={minWidth} xs={12} md={6} lg={4} xl={2}>
          <GeneralServerInfo serverInfo={serverInfo} dictionary={dictionary} />
        </Grid>
        <Grid item>
          <ServerInfoSettings serverInfo={serverInfo} dictionary={dictionary} />
        </Grid>
      </Grid>
    </Box>
  );
};
