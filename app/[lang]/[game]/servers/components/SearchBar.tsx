import { getDictionary } from "@/get-dictionary";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import debounce from "@mui/material/utils/debounce";
import { Dictionary, identity, pickBy } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  Ibf1MapOptionsKeys,
  bf1MapOptionsKeys as bf1MapOptionKeys,
} from "../types/bf1.types";

type Props = {
  dictionaryMap: Awaited<ReturnType<typeof getDictionary>>["maps"];
  dictionaryServer: Awaited<ReturnType<typeof getDictionary>>["server"];
};

type FilterOptions = {
  search?: string | undefined | null;
  map?: string | undefined | null;
  isEmptyServer?: boolean | undefined | null;
};

export const SearchBar = ({ dictionaryMap, dictionaryServer }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let currentSearch = useMemo(() => searchParams.get("search"), [searchParams]);
  let currentMap = useMemo(() => searchParams.get("map"), [searchParams]);
  let currentIsEmptyServer = useMemo(
    () => searchParams.get("isEmptyServer"),
    [searchParams]
  );

  const filterOptions: FilterOptions = useMemo(() => {
    let options: FilterOptions = {};

    if (!currentSearch && !currentMap && !currentIsEmptyServer) return {};

    if (currentSearch) {
      options.search = currentSearch;
    }

    if (
      currentMap &&
      Object.keys(bf1MapOptionKeys).some((x) => x === currentMap)
    ) {
      options.map = currentMap;
    }

    if (currentIsEmptyServer) {
      options.isEmptyServer = currentIsEmptyServer === "true" ? true : false;
    }

    return options;
  }, [currentIsEmptyServer, currentMap, currentSearch]);

  const setFilterOptions = useCallback(
    (key: keyof FilterOptions, value: string | null | undefined) => {
      let newFilterOptions: FilterOptions = filterOptions;

      switch (key) {
        case "map": {
          newFilterOptions.map = value;
          break;
        }
        case "search": {
          console.log(value);
          newFilterOptions.search = value;
          break;
        }
        case "isEmptyServer": {
          newFilterOptions.isEmptyServer = value === "true" ? true : false;
          break;
        }
      }

      const cleanedFilterOptions = pickBy(
        newFilterOptions,
        identity
      ) as Dictionary<string>;

      router.replace(`servers?${new URLSearchParams(cleanedFilterOptions)}`);
    },
    [filterOptions, router]
  );

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
        getOptionLabel={(option) => dictionaryMap[option as Ibf1MapOptionsKeys]}
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
            {dictionaryServer.showEmptyServer}
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
