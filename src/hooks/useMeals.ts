import { useQuery } from "@tanstack/react-query";
import type { MealApiResponse } from "../models/interfaces";

const fetchMeals = async (endpoint: string): Promise<MealApiResponse> => {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Failed to fetch meals");
    }
    return response.json();
};

export function useMeals(
    selectedCategory: string,
    debouncedSearch: string
) {
    const endpoint = debouncedSearch.trim()
        ? `${import.meta.env.VITE_BASE_API}/search.php?s=${debouncedSearch}`
        : `${import.meta.env.VITE_BASE_API}/filter.php?c=${selectedCategory}`;

    return useQuery({
        queryKey: ["meals", selectedCategory, debouncedSearch],
        queryFn: () => fetchMeals(endpoint),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData,
    });
}