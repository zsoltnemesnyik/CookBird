import type { Meal } from "../../models/interfaces";

interface Props {
  meal: Meal;
}

function MealCard({ meal }: Props) {
  return (
    <div>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded mb-2"
      />
      <h2 className="font-bold text-lg">{meal.strMeal}</h2>
    </div>
  );
}

export default MealCard;