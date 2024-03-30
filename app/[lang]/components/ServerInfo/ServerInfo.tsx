"use client";
import {
  Card,
  CardContent,
  CardHeader,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ICombinedDictionaries } from "../../types/dictionary.types";
import { GeneralServerInfo } from "./GeneralServerInfol";
import { ServerInfoSettings } from "./ServerInfoSettings";
import { IServerInfo } from "./serverInfo.types";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import { MapRotation } from "./MapRotation";

type Props = {
  serverInfo: IServerInfo | undefined;
  dictionary: ICombinedDictionaries;
};

export const ServerInfo = ({ serverInfo, dictionary }: Props) => {
  const minWidth = "370px";

  const hasSettings = useMemo(
    () =>
      serverInfo?.settings && Object.entries(serverInfo?.settings).length > 1,
    [serverInfo?.settings]
  );

  return (
    <Box marginTop={1}>
      <Grid container spacing={2} flexDirection={"row"}>
        <Grid item minWidth={minWidth} xs={12} md={6} lg={4} xl={2}>
          <GeneralServerInfo
            serverInfo={serverInfo}
            dictionary={dictionary.server}
          />
        </Grid>
        <Grid item minWidth={minWidth}>
          {hasSettings && (
            <ServerInfoSettings
              serverInfo={serverInfo}
              dictionary={dictionary.server}
            />
          )}
        </Grid>
        <Grid item xs={12} minWidth={minWidth}>
          {serverInfo && (
            <MapRotation
              dictionary={dictionary.server}
              maps={serverInfo.rotation}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
