import { getDictionary } from "@/get-dictionary";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import debounce from "@mui/material/utils/debounce";
import { useMemo } from "react";
import { useServerSearchParams } from "../../hooks/useServerSearchParams";
import { MapOptionKeys } from "../../types/maps.types";
import { regionKeys } from "../../types/region.types";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  dictionary: {
    server: Awaited<ReturnType<typeof getDictionary>>["server"];
    maps: Awaited<ReturnType<typeof getDictionary>>["maps"];
  };
  mapOptionKeys: readonly MapOptionKeys[];
};

export const SearchBar = ({ dictionary, mapOptionKeys }: Props) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { filterOptions, setFilterOptions } =
    useServerSearchParams(mapOptionKeys);

  const combinedKeys = useMemo(
    () =>
      Object.assign({}, dictionary.maps.bf1Maps, dictionary.maps.bf5Maps, null),
    [dictionary.maps]
  );

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        id="filled-search"
        label="Search name"
        type="search"
        variant="filled"
        size={isSm ? "small" : "medium"}
        defaultValue={filterOptions?.search}
        onChange={debounce(
          (e) => setFilterOptions("search", e.target.value),
          300
        )}
      />
      <Autocomplete
        value={filterOptions?.map || null}
        onChange={(_, value) => setFilterOptions("map", value)}
        fullWidth
        options={mapOptionKeys}
        size={isSm ? "small" : "medium"}
        getOptionLabel={(option) => combinedKeys[option as MapOptionKeys]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Filter map"
            placeholder="Favorites"
          />
        )}
        sx={{ margin: "0.5em" }}
      />
      <FormControl
        variant="filled"
        sx={{ minWidth: isSm ? 80 : 140, marginRight: 1 }}
      >
        <InputLabel id="label-region-label">
          {dictionary.server.region.title}
        </InputLabel>
        <Select
          size={isSm ? "small" : "medium"}
          labelId="label-region-label"
          id="label-region"
          value={filterOptions?.region ?? "eu"}
          onChange={(e) => setFilterOptions("region", e.target.value)}
          variant="filled"
          defaultValue={"eu"}
        >
          {regionKeys.map((region) => (
            <MenuItem key={region} value={region}>
              <Typography overflow={"hidden"}>
                {
                  dictionary.server.region.options[region][
                    isSm ? "short" : "default"
                  ]
                }
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Paper sx={{ padding: isSm ? 0.5 : 1 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            {dictionary.server.showEmptyServer}
          </Typography>
          <Switch
            value={filterOptions?.isEmptyServer}
            onChange={(e) =>
              setFilterOptions("isEmptyServer", e.target.checked.toString())
            }
          />
        </Box>
      </Paper>
    </Toolbar>
  );
};
