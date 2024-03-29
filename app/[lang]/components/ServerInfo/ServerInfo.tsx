import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import { getDictionary } from "@/get-dictionary";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "next/navigation";
import { GeneralServerInfo } from "./GeneralServerInfol";
import { ServerInfoSettings } from "./ServerInfoSettings";
import { ICombinedDictionaries } from "../../types/dictionary.types";
import { IServerInfo } from "./serverInfo.types";

type Props = {
  serverInfo: IServerInfo | undefined;
  dictionary: ICombinedDictionaries;
};

export const ServerInfo = ({ serverInfo, dictionary }: Props) => {
  const minWidth = "500px";

  const theme = useTheme();

  return (
    <Box marginTop={1}>
      <Grid container spacing={2} flexDirection={"row"} minWidth={minWidth}>
        <Grid item minWidth={minWidth} xs={12} md={6} lg={4} xl={2}>
          <GeneralServerInfo
            serverInfo={serverInfo}
            dictionary={dictionary.server}
          />
        </Grid>
        <Grid item>
          <ServerInfoSettings
            serverInfo={serverInfo}
            dictionary={dictionary.server}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
