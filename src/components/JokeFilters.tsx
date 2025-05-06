import { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
  CircularProgress,
} from "@mui/material";
import { api } from "../services/api";

const StyledFormControl = styled(FormControl)({
  flex: 1,
});

const StyledInputLabel = styled(InputLabel)({
  color: "white",
});

const StyledSelect = styled(Select)({
  color: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  ".MuiSvgIcon-root": {
    color: "white",
  },
});

const FiltersContainer = styled(Box)({
  display: "flex",
  marginBottom: 16,
  justifyContent: "center",
  gap: 16,
});

interface JokeFiltersProps {
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function JokeFilters({
  sortOrder,
  onSortOrderChange,
  selectedType,
  onTypeChange,
}: JokeFiltersProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoadingTypes(true);
      try {
        const data = await api.fetchTypes();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
      } finally {
        setIsLoadingTypes(false);
      }
    };

    fetchTypes();
  }, []);

  return (
    <FiltersContainer>
      <StyledFormControl>
        <StyledInputLabel>Sort Order</StyledInputLabel>
        <StyledSelect
          value={sortOrder}
          label="Sort Order"
          onChange={(e) => onSortOrderChange(e.target.value as "asc" | "desc")}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </StyledSelect>
      </StyledFormControl>

      <StyledFormControl>
        <StyledInputLabel>Type</StyledInputLabel>
        <StyledSelect
          value={selectedType}
          label="Type"
          onChange={(e) => onTypeChange(e.target.value as string)}
          endAdornment={
            isLoadingTypes ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : null
          }
        >
          <MenuItem value="">All Types</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </FiltersContainer>
  );
}
