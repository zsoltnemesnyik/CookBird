import type { Meal } from "@/models/interfaces";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIngredients = (meal: Meal) => {
  return Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const ingredient = meal[`strIngredient${num}`];
    const measure = meal[`strMeasure${num}`];

    if (ingredient && ingredient.trim() !== "") {
      return {
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? "",
      };
    }

    return null;
  }).filter(Boolean) as { ingredient: string; measure: string }[];
};

export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages: (number | "dots")[] = [];

  const start = Math.max(currentPage - 1, 1);
  const end = Math.min(currentPage + 1, totalPages);

  // First 2 pages
  for (let i = 1; i <= Math.min(2, totalPages); i++) {
    pages.push(i);
  }

  // Dots on the left
  if (start > 3) {
    pages.push("dots");
  }

  // Middle range
  for (let i = start; i <= end; i++) {
    if (i > 2 && i < totalPages - 1) {
      pages.push(i);
    }
  }

  // Jobb oldali dots
  if (end < totalPages - 2) {
    pages.push("dots");
  }

  // Utolsó 2 oldal
  for (
    let i = Math.max(totalPages - 1, 3);
    i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  return pages;
};

export const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
};