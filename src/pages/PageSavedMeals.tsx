import MealCard from "@/components/meals/MealCard";
import { Button } from "@/components/ui/button";
import { useFavourites } from "@/lib/context/FavouritesContext";
import type { Meal } from "@/models/interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PageSavedMeals = () => {
  const [loading, setLoading] = useState(true);
  const { favourites, toggleFavourite } = useFavourites();
  const [meals, setMeals] = useState<Meal[]>([]);

  // Fetch all saved meals simultaneously
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const results = await Promise.all(
        favourites.map((id) =>
          fetch(`${import.meta.env.VITE_BASE_API}/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((data) => data.meals[0])
        )
      );

      setMeals(results);
      setLoading(false);
    };

    fetchMeals();
  }, [favourites]);

  return (
    <section className="flex flex-col gap-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Saved Meals
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : meals.length === 0 ? (
        <>
          <p className="text-center">No saved meals yet.</p>
          <Button asChild className="self-center">
            <Link to="/">Back to Home</Link>
          </Button>
        </>
      ) : (
        <div className="meal-list">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} saved={true} handleClick={toggleFavourite} />
          ))}
        </div>
      )}

    </section>
  );
};

export default PageSavedMeals;