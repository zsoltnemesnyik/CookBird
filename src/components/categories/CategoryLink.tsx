import type { Category } from "../../models/interfaces";

const activeClass = "translate-x-4 opacity-100";

const CategoryLink = ({
  category,
  selectedCategory,
  setSelectedCategory,
}: {
  category: Category;
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}) => {
  return (
    <button
      className="cursor-pointer px-2 group"
      onClick={() => setSelectedCategory(category.strCategory)}
    >
      <span
        className={`text-sm inline-block opacity-30 transition-all group-hover:translate-x-4
                ${selectedCategory === category.strCategory ? activeClass : ""}`}
      >
        {category.strCategory}
      </span>
    </button>
  );
};
export default CategoryLink;
