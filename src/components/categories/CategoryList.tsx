import { useCategories } from "@/hooks/useCategories";
import CategoryLink from "./CategoryLink";

const CategoryList = ({
  disabled,
  selectedCategory,
  setSelectedCategory,
}: {
  disabled: boolean;
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}) => {
  const { data, error, isLoading } = useCategories();

  const loading = isLoading;

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!data) return null;

  const categories = data.categories ?? [];

  if (categories.length === 0) return <p>No categories found.</p>;

  return (
    <div
      className={`max-sm:justify-center flex-row flex-wrap flex sm:flex-col items-start transition-opacity ${disabled ? "pointer-events-none opacity-15" : ""}`}
    >
      {categories
        .sort((a, b) => a.strCategory.localeCompare(b.strCategory))
        .map((category) => (
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
