import type { Meal } from "@/models/interfaces";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 
export const getIngredients = (meal: Meal) => {
  return Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const ingredient = meal[`strIngredient${num}`];
    const measure    = meal[`strMeasure${num}`];

    if (ingredient && ingredient.trim() !== "") {
      return {
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? "",
      };
    }

    return null;
  }).filter(Boolean) as { ingredient: string; measure: string }[];
};
