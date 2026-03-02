const SearchInput = ({searchName, setSearchName}: {searchName: string, setSearchName: (name: string) => void}) => {
    return (
        <input
            type="text"
            className="bg-white text-sm py-2 px-4 rounded-full"
            placeholder="Eg. Chicken"
            value={searchName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchName(e.target.value)
            }
        />
    )
}
export default SearchInput