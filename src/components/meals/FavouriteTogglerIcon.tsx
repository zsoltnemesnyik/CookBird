import { forwardRef } from "react";
import { HeartIcon } from "lucide-react";

const FavouriteTogglerIcon = forwardRef<
  SVGSVGElement,
  {
    position?: string;
    color?: string;
    saved: boolean;
    handleClick: (id: string) => void;
    id: string;
  }
>(({ position, color, saved, handleClick, id }, ref) => {
  return (
    <HeartIcon
      ref={ref}
      className={`cursor-pointer hover:opacity-65 transition-opacity ${
        position === "absolute" ? "absolute top-5 right-5" : ""
      }`}
      fill={saved ? color : "none"}
      stroke={saved ? color : color}
      onClick={() => handleClick(id)}
    />
  );
});

FavouriteTogglerIcon.displayName = "FavouriteTogglerIcon";

export default FavouriteTogglerIcon;