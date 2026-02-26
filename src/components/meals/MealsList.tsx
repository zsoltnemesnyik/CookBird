import { useFavourites } from "@/lib/context/FavouritesContext";
import type { Meal } from "../../models/interfaces";
import MealCard from "./MealCard";
import { MealCardSkeleton } from "./MealCardSkeleton";

type MealsListProps = {
  meals: Meal[];
  loading: boolean;
  error: string | null;
};

function MealsList({ meals, loading, error }: MealsListProps) {
  const { favourites, toggleFavourite } = useFavourites();

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, idx) => (
            <MealCardSkeleton key={idx} />
          ))}
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (meals.length === 0) return <p>No meals found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          handleClick={toggleFavourite}
          saved={favourites.includes(meal.idMeal)}
        />
      ))}
    </div>
  );
}

export default MealsList;
