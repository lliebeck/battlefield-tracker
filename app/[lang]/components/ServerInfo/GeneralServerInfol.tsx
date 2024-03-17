import { Bf1DetailedServerInfo } from "@/api/model";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IServerInfo } from "./serverInfo.types";

type GeneralServerInfoProps = {
  serverInfo: IServerInfo | undefined;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const GeneralServerInfo = ({
  serverInfo,
  dictionary,
}: GeneralServerInfoProps) => {
  return (
    <Card sx={{ maxWidth: "500px" }}>
      <CardMedia
        sx={{ height: "300px" }}
        image={serverInfo?.currentMapImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {serverInfo?.prefix}
        </Typography>
        <Grid container flexDirection={"row"} spacing={2}>
          <Grid item>
            <Typography variant={"body2"}>{dictionary.map}</Typography>
            <Typography variant={"body1"}>{serverInfo?.currentMap}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>{dictionary.mode}</Typography>
            <Typography variant={"body1"}>{serverInfo?.mode}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>{dictionary.player}</Typography>
            <Typography
              variant={"body1"}
            >{`${serverInfo?.playerAmount}/${serverInfo?.maxPlayerAmount}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>{dictionary.inQue}</Typography>
            <Typography variant={"body1"}>{serverInfo?.inQueue}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>{dictionary.region}</Typography>
            <Typography variant={"body1"}>{serverInfo?.region}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"}>{dictionary.owner}</Typography>
            <Typography variant={"body1"}>{serverInfo?.owner?.name}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
