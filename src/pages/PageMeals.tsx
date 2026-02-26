import { useState } from "react";
import useFetch from "../hooks/useFetch";
import type { MealApiResponse } from "../models/interfaces";

import MealsList from "../components/meals/MealsList";
import Filters from "@/components/filter/Filters";

const PageMeals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");
  const [searchName, setSearchName] = useState<string>("");

  const endpoint = searchName.trim()
    ? `${import.meta.env.VITE_BASE_API}/search.php?s=${searchName}`
    : `${import.meta.env.VITE_BASE_API}/filter.php?c=${selectedCategory}`;

  const { data, error, loading } = useFetch<MealApiResponse>(endpoint);

  const meals = data?.meals ?? [];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Meals</h1>

      <div className="grid sm:grid-cols-[minmax(200px,1fr)_3fr] gap-8 items-start">
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchName={searchName}
          setSearchName={setSearchName}
        />

        <MealsList meals={meals} loading={loading} error={error} />
      </div>
    </>
  )
}
export default PageMeals