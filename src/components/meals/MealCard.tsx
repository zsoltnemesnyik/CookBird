import { useState } from "react";
import type { Meal } from "../../models/interfaces";

interface Props {
  meal: Meal;
}

const MealCard = ({ meal }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div>
      {/* Skeleton / Placeholder */}
      {!imgLoaded && (
        <div className="bg-gray-200 h-32 w-full animate-pulse" />
      )}

      {/* Lazy-load kép + Blur + Fade-in */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={`w-full h-32 object-cover rounded transition-all duration-500 ease-out
          ${imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
      />

      <div className="p-2">
        <h2 className="font-bold text-lg">
          {meal.strMeal}
        </h2>
      </div>
    </div>
  );
};

export default MealCard;
