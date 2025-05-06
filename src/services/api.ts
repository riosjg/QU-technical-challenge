const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3005";

export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export const api = {
  fetchJokes: async (count: number = 1, type?: string): Promise<Joke[]> => {
    let path: string;

    if (type) {
      path = count === 1 ? `jokes/${type}/random` : `jokes/${type}/ten`;
    } else {
      path = count === 1 ? `random_joke` : `jokes/random/${count}`;
    }

    const res = await fetch(`${BASE_URL}/${path}`);
    if (!res.ok) {
      throw new Error(`Error ${res.status} getting jokes`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  },

  fetchTypes: async (): Promise<string[]> => {
    const res = await fetch(`${BASE_URL}/types`);
    if (!res.ok) {
      throw new Error(`Error ${res.status} getting jokes by type`);
    }
    return res.json();
  },
};
