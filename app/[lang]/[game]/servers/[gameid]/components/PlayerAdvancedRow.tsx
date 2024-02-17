import { Bf1Combined } from "@/api/model/bf1Combined";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Props = {
  show: boolean;
  player: Bf1Combined | undefined;
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
              <Grid item xs={3} sm={2}>
                <Item label={"Kills"} value={player?.kills} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Deaths" value={player?.deaths} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Headshots" value={player?.headShots} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Kill assists" value={player?.killAssists} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Kill per Minute" value={player?.killsPerMinute} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Skill" value={player?.skill} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Wins" value={player?.wins} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Loses" value={player?.loses} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Win percentage" value={player?.winPercent} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Revives" value={player?.revives} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Heals" value={player?.heals} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Item label="Dogtags taken" value={player?.dogtagsTaken} />
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

type ItemProps = {
  label: string;
  value: string | number | undefined;
};
const Item = ({ label, value }: ItemProps) => {
  return (
    <>
      <Typography variant={"body2"}>{label}</Typography>
      <Typography variant="h6">{value?.toString()}</Typography>
    </>
  );
};
