import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import debounce from "@mui/material/utils/debounce";

type Props = {
  search: string;
  setSearch: (e: string) => void;
};

export const SearchBar = ({ search, setSearch }: Props) => {
  const searchDelayed = debounce(
    (newValue: string) => setSearch(newValue),
    300
  );

  return (
    <Toolbar>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        placeholder={search}
        onChange={(e) => {
          searchDelayed(e.target.value);
        }}
      />
    </Toolbar>
  );
};
