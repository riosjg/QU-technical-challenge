import { useInfiniteQuery } from "@tanstack/react-query";
import { api, type Joke } from "../services/api";

interface useJokesOptions {
  filter?: string;
  type?: string;
}

export function useJokes({ filter, type }: useJokesOptions) {
  return useInfiniteQuery<Joke[], Error, Joke[]>({
    queryKey: ["jokes", filter, type],
    initialPageParam: 1,
    queryFn: async (context) => {
      const pageParam = (context.pageParam as number) || 1;
      const response = await api.fetchJokes(pageParam * 10, type);
      return response;
    },
    getNextPageParam: (_lastPage, pages) => {
      return pages.length + 1;
    },
    select: (data) => {
      const all = data.pages.flat();
      const seen = new Set<number>();
      const unique: Joke[] = [];

      for (const j of all) {
        if (!seen.has(j.id)) {
          seen.add(j.id);
          unique.push(j);
        }
      }

      if (filter) {
        const term = filter.toLowerCase();
        return unique.filter(
          (joke) =>
            joke.setup.toLowerCase().includes(term) ||
            joke.punchline.toLowerCase().includes(term)
        );
      }

      return unique;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
