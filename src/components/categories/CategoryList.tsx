import useFetch from "../../hooks/useFetch";
import type { CategoryApiResponse } from "../../models/interfaces";
import CategoryLink from "./CategoryLink";

const CategoryList = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}) => {
  const { data, error, loading } = useFetch<CategoryApiResponse>(
    `${import.meta.env.VITE_BASE_API}/categories.php`,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const categories = data.categories ?? [];

  if (categories.length === 0) return <p>No categories found.</p>;

  return (
    <div className="flex flex-col items-start">
      {categories.map((category) => (
        <CategoryLink
          key={category.idCategory}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
};
export default CategoryList;
