import { useState, useEffect, useMemo } from "react";
import { useJokes } from "./hooks/useJokes";
import { useInView } from "react-intersection-observer";
import { JokeFilters } from "./components/JokeFilters";
import { JokeItem } from "./components/JokeItem";
import { Box, Typography, CircularProgress } from "@mui/material";

export function JokeApp() {
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: jokes = [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJokes({ type: selectedType });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const filteredAndSortedJokes = useMemo(() => {
    const uniqueJokes = jokes.filter(
      (joke, index, self) => index === self.findIndex((j) => j.id === joke.id)
    );

    const searchFilteredJokes = searchTerm
      ? uniqueJokes.filter(
          (joke) =>
            joke.setup.toLowerCase().includes(searchTerm.toLowerCase()) ||
            joke.punchline.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : uniqueJokes;

    return [...searchFilteredJokes].sort((a, b) =>
      sortOrder === "asc"
        ? a.setup.localeCompare(b.setup)
        : b.setup.localeCompare(a.setup)
    );
  }, [jokes, sortOrder, searchTerm]);

  if (isLoading) return <Typography>Loading jokes…</Typography>;
  if (isError)
    return <Typography color="error">Error loading jokes</Typography>;

  return (
    <Box>
      <JokeFilters
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />
      {filteredAndSortedJokes.length > 0 ? (
        filteredAndSortedJokes.map((joke) => (
          <JokeItem key={joke?.id} joke={joke} />
        ))
      ) : (
        <Typography align="center" sx={{ mt: 2 }}>
          No jokes found
        </Typography>
      )}
      <Box ref={ref} sx={{ height: 1, mt: 2 }}>
        {isFetchingNextPage && <CircularProgress />}
      </Box>
      {!hasNextPage && filteredAndSortedJokes.length > 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No more jokes
        </Typography>
      )}
    </Box>
  );
}
