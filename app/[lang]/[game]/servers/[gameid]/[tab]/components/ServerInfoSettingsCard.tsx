import {
  ServerSettingsKits,
  ServerSettingsMisc,
  ServerSettingsScales,
  ServerSettingsVehicles,
  ServerSettingsWeapons,
} from "@/api/model";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  label: string;
  value:
    | ServerSettingsKits
    | ServerSettingsMisc
    | ServerSettingsScales
    | ServerSettingsVehicles
    | ServerSettingsWeapons;
};

export const ServerInfoSettingsCard = ({ value, label }: Props) => {
  return (
    <Card variant={"outlined"} sx={{ padding: 1 }}>
      <Typography variant="h6">{label}</Typography>
      {Object.entries(value).map((x) => (
        <Box key={x[0]} display={"flex"}>
          <Typography variant="subtitle2">{x[0]}:</Typography>
          <Typography marginLeft={1} variant="subtitle2">
            {x[1]}
          </Typography>
        </Box>
      ))}
    </Card>
  );
};
