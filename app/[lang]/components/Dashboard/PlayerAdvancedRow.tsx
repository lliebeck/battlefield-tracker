import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { PlayerAdvancedRowItem } from "./PlayerAdvancedRowItem";
import { DashboardPlayer } from "./dashboard.types";

type Props = {
  show: boolean;
  player: DashboardPlayer | undefined;
};

export const PlayerAdvancedRow = ({ show, player }: Props) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        <Collapse in={show} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6">ADVANCED OVERVIEW</Typography>
            <Divider sx={{ marginBottom: 1 }} />
            <Grid container spacing={2}>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem label={"Kills"} value={player?.kills} />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem label="Deaths" value={player?.deaths} />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem
                  label="Headshots"
                  value={player?.headShots}
                />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem
                  label="Kill assists"
                  value={player?.killAssists}
                />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem
                  label="Kill per Minute"
                  value={player?.killsPerMinute}
                />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem label="Skill" value={player?.skill} />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem label="Wins" value={player?.wins} />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem label="Loses" value={player?.loses} />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem
                  label="Win percentage"
                  value={player?.winPercent}
                />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem
                  label="Revives"
                  value={player?.revives}
                />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem label="Heals" value={player?.heals} />
              </Grid>
              <Grid
                size={{
                  xs: 3,
                  sm: 2
                }}>
                <PlayerAdvancedRowItem
                  label="Dogtags taken"
                  value={player?.dogtagsTaken}
                />
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
