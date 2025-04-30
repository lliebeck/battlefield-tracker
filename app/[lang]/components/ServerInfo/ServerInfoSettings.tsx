import { getDictionary } from "@/get-dictionary";
import { Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ServerInfoSettingsCard } from "./ServerInfoSettingsCard";
import { IServerInfo } from "./serverInfo.types";

type Props = {
  serverInfo: IServerInfo | undefined;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const ServerInfoSettings = ({ serverInfo, dictionary }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dictionary.settings.title}
        </Typography>
        <Grid container flexDirection={"row"} spacing={2}>
          <Grid>
            {serverInfo?.settings.Misc && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Misc}
                label={dictionary.settings.extended}
              />
            )}
          </Grid>
          <Grid container flexDirection={"column"} spacing={2} size="grow">
            <Grid>
              {serverInfo?.settings.Vehicles && (
                <ServerInfoSettingsCard
                  value={serverInfo?.settings.Vehicles}
                  label={dictionary.settings.vehicles}
                />
              )}
            </Grid>
            <Grid>
              {serverInfo?.settings.Scales && (
                <ServerInfoSettingsCard
                  value={serverInfo?.settings.Scales}
                  label={dictionary.settings.scales}
                />
              )}
            </Grid>
            <Grid>
              {serverInfo?.settings.Kits && (
                <ServerInfoSettingsCard
                  value={serverInfo?.settings.Kits}
                  label={dictionary.settings.kits}
                />
              )}
            </Grid>
          </Grid>
          <Grid>
            {serverInfo?.settings.Weapons && (
              <ServerInfoSettingsCard
                value={serverInfo?.settings.Weapons}
                label={dictionary.settings.weapons}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
