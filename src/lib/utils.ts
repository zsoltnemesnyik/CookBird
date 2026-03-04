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

export const getVisiblePages = (
  currentPage: number,
  totalPages: number
) => {
  const pages: (number | "dots")[] = [];

  const start = Math.max(currentPage - 1, 1);
  const end = Math.min(currentPage + 1, totalPages);

  // First page
  if (totalPages >= 1) {
    pages.push(1);
  }

  // Left dots
  if (start > 2) {
    pages.push("dots");
  }

  // Middle range
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(i);
    }
  }

  // Right dots
  if (end < totalPages - 1) {
    pages.push("dots");
  }

  // Last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
};