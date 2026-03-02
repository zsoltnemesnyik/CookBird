import { useState } from "react";
import { SINGLE_MEAL_PATH } from "../../lib/constants";
import type { Meal } from "../../models/interfaces";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import FavouriteTogglerIcon from "./FavouriteTogglerIcon";

const MealCard = ({
  meal,
  saved,
  handleClick,
}: {
  meal: Meal;
  saved: boolean;
  handleClick: (id: string) => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="shadow-lg rounded-lg p-2 pb-3 h-full flex flex-col gap-2">
      {/* Lazy-load image + Blur + Fade-in */}
      <img
        src={`${meal.strMealThumb}/small`}
        alt={meal.strMeal}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={`max-sm:h-auto  max-sm:aspect-4/3 w-full h-32 object-cover rounded-sm transition-all duration-500 ease-out
          ${imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
      />

      <h2 className="grow font-bold text-lg mb-5">{meal.strMeal}</h2>
      <div className="flex items-center justify-between">
        <Button asChild size={"xs"} className="group">
          <Link to={`/${SINGLE_MEAL_PATH}/${meal.idMeal}`}>
            View Recipe
            <ArrowRight className="ml-2 group-hover:-translate-x-1 transition-all" />
          </Link>
        </Button>
        <FavouriteTogglerIcon
          saved={saved}
          color="#000000"
          handleClick={handleClick}
          id={meal.idMeal}
        />
      </div>
    </div>
  );
};

export default MealCard;
