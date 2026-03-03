import { useQuery } from "@tanstack/react-query";
import type { MealApiResponse } from "../models/interfaces";

const fetchSingleMeal = async (id: string): Promise<MealApiResponse> => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/lookup.php?i=${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
};

export function useMealSingle(
    id: string,
) {

    return useQuery({
        queryKey: ["meal", id],
        queryFn: () => fetchSingleMeal(id),
        staleTime: 1000 * 60 * 5,
    });
}