import { useState } from "react";
import type { Meal } from "../../models/interfaces";
import { Link } from "react-router-dom";
import { SINGLE_MEAL_PATH } from "../../lib/constants";

const MealCard = ({ meal }: { meal: Meal }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link to={`/${SINGLE_MEAL_PATH}/${meal.idMeal}`}>
      {/* Skeleton / Placeholder */}
      {/* {!imgLoaded && <div className="bg-black/15 h-32 w-full animate-pulse" />} */}

      {/* Lazy-load kép + Blur + Fade-in */}
      <img
        src={`${meal.strMealThumb}/small`}
        alt={meal.strMeal}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={`w-full h-32 object-cover rounded transition-all duration-500 ease-out
          ${imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
      />

      <div className="p-2">
        <h2 className="font-bold text-lg">{meal.strMeal}</h2>
      </div>
    </Link>
  );
};

export default MealCard;
