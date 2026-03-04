import { useQuery } from "@tanstack/react-query";
import type { CategoryApiResponse } from "../models/interfaces";

const fetchCategories = async (): Promise<CategoryApiResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API}/categories.php`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export function useCategories() {
  return useQuery<CategoryApiResponse, Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60,
  });
}