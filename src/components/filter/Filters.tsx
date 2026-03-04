import SearchInput from "./SearchInput";
import CategoryList from "../categories/CategoryList";

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  searchName,
  setSearchName,
}: {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  searchName: string;
  setSearchName: (name: string) => void;
}) => {
  return (
    <div className="max-sm:text-center flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold">Search by name</h3>
        <SearchInput
          searchName={searchName}
          setSearchName={setSearchName}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold">Categories</h3>
        <CategoryList
          disabled={searchName !== ""}
          selectedCategory={searchName !== "" ? "" : selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};
export default Filters;
