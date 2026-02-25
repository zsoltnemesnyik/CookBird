import { HeartIcon } from "lucide-react";

const AddToFavourites = ({
    position,
    saved,
    handleClick,
    id,
}: {
    position?: string;
    saved: boolean;
    handleClick: (id: string) => void;
    id: string;
}) => {
    return (
        <HeartIcon
            className={`cursor-pointer hover:opacity-65 transition-opacity ${position === "absolute" ? "absolute top-5 right-5" : ""}`}
            fill={saved ? "red" : "none"}
            onClick={() => handleClick(id)}
        />
    );
};
export default AddToFavourites;
