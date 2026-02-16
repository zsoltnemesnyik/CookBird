import { useState } from "react";
import useFetch from "../hooks/useFetch";
import type { MealApiResponse } from "../models/interfaces";

import CategoryList from "../components/categories/CategoryList";
import MealsList from "../components/meals/MealsList";

const PageMeals = () => {
const [selectedCategory, setSelectedCategory] = useState<string>("Beef");

  const { data, error, loading } = useFetch<MealApiResponse>(
    `${import.meta.env.VITE_BASE_API}/filter.php?c=${selectedCategory}`
  );

  const meals = data?.meals ?? [];

  return (
    <>
        <h1 className="text-3xl font-bold mb-6 text-center">CookBird</h1>

        <div className="grid sm:grid-cols-[minmax(200px,1fr)_3fr] gap-8">
          <div>
            <h3 className="text-lg font-bold">Categories</h3>
            <CategoryList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <MealsList meals={meals} loading={loading} error={error} />
        </div>
    </>
  )
}
export default PageMeals