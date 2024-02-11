import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import debounce from "@mui/material/utils/debounce";
import { bf1MapOptions } from "../types/bf1.types";
import Paper from "@mui/material/Paper";

type Props = {
  search: string;
  setSearch: (e: string) => void;
  emptyServer: boolean;
  setEmptyServer: (e: boolean) => void;
  map: string;
  setMap: (e: string) => void;
};

export const SearchBar = ({
  search,
  setSearch,
  emptyServer,
  setEmptyServer,
  map,
  setMap,
}: Props) => {
  const searchDelayed = debounce(
    (newValue: string) => setSearch(newValue),
    300
  );

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        id="filled-search"
        label="Search name"
        type="search"
        variant="filled"
        placeholder={search}
        onChange={(e) => {
          searchDelayed(e.target.value);
        }}
      />
      <Autocomplete
        // multiple
        value={map}
        onChange={(_, value) => setMap(value ?? "")}
        fullWidth
        id="tags-outlined"
        options={bf1MapOptions}
        getOptionLabel={(option) => option}
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
            Empty Server
          </Typography>
          <Switch
            value={emptyServer}
            onChange={(e) => setEmptyServer(e.target.checked)}
          />
        </Box>
      </Paper>
    </Toolbar>
  );
};
