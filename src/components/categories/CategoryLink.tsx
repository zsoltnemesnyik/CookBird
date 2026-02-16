import type { Category } from "../../models/interfaces"

const CategoryLink = (
    {   category,
        setSelectedCategory,
    }: { 
        category: Category,
        setSelectedCategory: (categoryId: string) => void
     }
) => {
    return (
        <button className="px-2 group" onClick={() => setSelectedCategory(category.strCategory)}>
            <span className="text-sm inline-block opacity-30 transition-all group-hover:translate-x-4 group-hover:opacity-100">
                {category.strCategory}
            </span>
        </button>
    )
}
export default CategoryLink