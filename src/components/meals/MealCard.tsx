import { useState } from "react";
import type { Meal } from "../../models/interfaces";
import { Link } from "react-router-dom";
import { SINGLE_MEAL_PATH } from "../../lib/constants";
import { ArrowRight, HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

const MealCard = ({ meal }: { meal: Meal }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="h-full flex flex-col gap-2">
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

      <h2 className="grow font-bold text-lg mb-5">{meal.strMeal}</h2>
      <div className="flex items-center justify-between">
        <Button asChild size={"xs"}>
          <Link to={`/${SINGLE_MEAL_PATH}/${meal.idMeal}`}>
            View Recipe
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <HeartIcon />
      </div>
    </div>
  );
};

export default MealCard;
