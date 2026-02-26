import { HeartIcon } from "lucide-react";

const FavouriteTogglerIcon  = ({
    position,
    color,
    saved,
    handleClick,
    id,
}: {
    position?: string;
    color?: string;
    saved: boolean;
    handleClick: (id: string) => void;
    id: string;
}) => {
    return (
        <HeartIcon
            className={`cursor-pointer hover:opacity-65 transition-opacity ${position === "absolute" ? "absolute top-5 right-5" : ""}`}
            fill={saved ? color : "none"}
            stroke={saved ? color : color}
            onClick={() => handleClick(id)}
        />
    );
};
export default FavouriteTogglerIcon ;
