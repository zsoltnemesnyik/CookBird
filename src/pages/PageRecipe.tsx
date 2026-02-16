import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealApiResponse } from "../models/interfaces";

const PageRecipe = () => {
    const { id } = useParams();
    const { data, error, loading } = useFetch<MealApiResponse>(
        `${import.meta.env.VITE_BASE_API}/lookup.php?i=${id}`,
    );

    const meals = data?.meals ?? [];
    
    if (loading)
        return (
          <p>Loading...</p>
        );
    if (error) return <p className="text-red-500">{error}</p>;
    if (meals.length === 0) return <p>No single meal found.</p>;

    return (
        <section>
            <h1 className="text-3xl font-bold mb-6 text-center">{meals[0].strMeal}</h1>
            <p>{meals[0].strInstructions}</p>
        </section>
    );
};
export default PageRecipe;
