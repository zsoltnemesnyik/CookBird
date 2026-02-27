import { useEffect, useState } from "react";

import MealsList from "../components/meals/MealsList";
import Filters from "@/components/filter/Filters";
import { useMeals } from "@/hooks/useMeals";

const PageMeals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");
  const [searchName, setSearchName] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchName);
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchName]);

  const { data, error, isLoading } = useMeals(
    selectedCategory,
    debouncedSearch
  );

  const meals = data?.meals ?? [];
  const loading = isLoading;

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

        <MealsList meals={meals} loading={loading} error={error?.message || null} />
      </div>
    </>
  )
}
export default PageMeals