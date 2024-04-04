import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(path)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  });

  return { data, isFetching, error };
}
