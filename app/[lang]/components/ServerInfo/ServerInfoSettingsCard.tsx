import {
  ServerSettingsKits,
  ServerSettingsMisc,
  ServerSettingsScales,
  ServerSettingsVehicles,
  ServerSettingsWeapons,
} from "@/api/model";
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
    <Box>
      <Typography variant="h6">{label}</Typography>
      {Object.entries(value).map(([key, value]) => (
        <Box key={key} display={"flex"}>
          <Typography variant="subtitle2" lineHeight={1.5} fontSize={12}>
            {key}:
          </Typography>
          <Typography
            marginLeft={1}
            variant="subtitle2"
            lineHeight={1.5}
            fontSize={13}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
