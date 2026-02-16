import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await response.json();

        setState({
          data: json,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        if (err.name === "AbortError") return;

        setState({
          data: null,
          loading: false,
          error: err.message,
        });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return state;
}

export default useFetch;