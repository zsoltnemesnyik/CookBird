import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Link } from "react-router-dom";
import { usePageScrolled } from "@/hooks/usePageScrolled";
import { useFavourites } from "@/lib/context/FavouritesContext";
import FavouritesCountBadge from "../meals/FavouritesCountBadge";

const Header = () => {
  const { favourites } = useFavourites();
  const isScrolled = usePageScrolled();

  useGSAP(() => {
    gsap.from("header", {
      opacity: 0,
      duration: 0.5,
      delay: 1.25,
      ease: "power2.in",
    });
  });

  return (
    <header
      className={`fixed w-full top-0 z-20 transition-colors duration-400 ${isScrolled ? "bg-black/15 backdrop-blur-md" : ""}`}
    >
      <div className="container mx-auto px-5 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl">
          <span className={`${isScrolled ? "text-white" : ""}`}>COOKBIRD</span>
        </Link>
        <nav>
          <ul
            className={`flex max-md:flex-col gap-5 transition-colors duration-400 ${isScrolled ? "text-white" : ""}`}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="relative">
              <Link to="/favourites">
                <span>Favourites</span>
                {favourites.length > 0 && <FavouritesCountBadge count={favourites.length} />}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
