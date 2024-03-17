import { getDictionary } from "@/get-dictionary";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import debounce from "@mui/material/utils/debounce";
import { useServerSearchParams } from "../hooks/useServerSearchParams";
import { Ibf1MapOptionsKeys, bf1MapOptionKeys } from "../types/bf1.types";

type Props = {
  dictionary: {
    server: Awaited<ReturnType<typeof getDictionary>>["server"];
    maps: Awaited<ReturnType<typeof getDictionary>>["maps"];
  };
};

export const SearchBar = ({ dictionary }: Props) => {
  const { filterOptions, setFilterOptions } = useServerSearchParams();

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        id="filled-search"
        label="Search name"
        type="search"
        variant="filled"
        defaultValue={filterOptions?.search}
        onChange={debounce(
          (e) => setFilterOptions("search", e.target.value),
          300
        )}
      />
      <Autocomplete
        // multiple
        value={filterOptions?.map}
        onChange={(_, value) => setFilterOptions("map", value)}
        fullWidth
        id="tags-outlined"
        options={Object.keys(bf1MapOptionKeys)}
        getOptionLabel={(option) =>
          dictionary.maps[option as Ibf1MapOptionsKeys]
        }
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
      <Paper sx={{ padding: "0.5em" }}>
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
