import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { useJokes } from "../useJokes";
import { api } from "../../services/api";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Joke } from "../../services/api";
import { createWrapper } from "../../test/test-utils";

vi.mock("../../services/api", () => ({
  api: {
    fetchJokes: vi.fn(),
    fetchTypes: vi.fn(),
  },
}));

const mockJokes: Joke[] = [
  {
    id: 1,
    type: "general",
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!",
  },
  {
    id: 2,
    type: "programming",
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs!",
  },
];

describe("useJokes", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    (api.fetchJokes as ReturnType<typeof vi.fn>).mockResolvedValue(mockJokes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch jokes successfully", async () => {
    const { result } = renderHook(() => useJokes({}), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockJokes);
  });

  it("should filter jokes when filter is provided", async () => {
    const { result } = renderHook(() => useJokes({ filter: "dark mode" }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].setup).toContain("dark mode");
  });

  it("should handle errors", async () => {
    const error = new Error("Failed to fetch");
    (api.fetchJokes as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useJokes({}), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(error);
  });
});
