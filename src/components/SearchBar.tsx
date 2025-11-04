import { TextField, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Box>
      <TextField
        className="search-bar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar..."
        size="medium"
        fullWidth={false}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Search color="action" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
