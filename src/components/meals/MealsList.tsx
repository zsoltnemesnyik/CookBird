import { useEffect } from "react";
import { useFavourites } from "@/lib/context/FavouritesContext";
import type { Meal } from "../../models/interfaces";
import MealCard from "./MealCard";
import { MealCardSkeleton } from "./MealCardSkeleton";
import Pagination from "./Pagination";
import { ITEMS_PER_PAGE } from "@/lib/constants";

type MealsListProps = {
  meals: Meal[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loading: boolean;
  error: string | null;
};

function MealsList({ meals, currentPage, setCurrentPage, loading, error }: MealsListProps) {
  const { favourites, toggleFavourite } = useFavourites();

  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [meals, setCurrentPage]);

  // Client-side slice
  const paginatedMeals = meals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(ITEMS_PER_PAGE)
          .fill(0)
          .map((_, idx) => (
            <MealCardSkeleton key={idx} />
          ))}
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;
  if (meals.length === 0) return <p>No meals found.</p>;

  return (
    <div className="flex flex-col items-center gap-20">
      <div className="w-full grid max-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.75">
        {paginatedMeals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            handleClick={toggleFavourite}
            saved={favourites.includes(meal.idMeal)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default MealsList;