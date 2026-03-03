import gsap from "gsap";
import { Flip, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMealSingle } from "@/hooks/useMealSingle";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { getIngredients } from "@/lib/utils";
import BackgroundLines from "@/components/layout/BackgroundLines";
import FavouriteTogglerIcon  from "@/components/meals/FavouriteTogglerIcon";
import { useFavourites } from "@/lib/context/FavouritesContext";


gsap.registerPlugin(Flip, SplitText);

const PageRecipe = () => {
    const { id } = useParams();
    const { toggleFavourite, favourites } = useFavourites();

    const [imgLoaded, setImgLoaded] = useState(false);

    const imgWrapperRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);
    const favIconRef = useRef<SVGSVGElement | null>(null);

    const { data, error, isLoading } = useMealSingle(id as string);
    const loading = isLoading;

    const meals = data?.meals ?? [];

    useGSAP(
        () => {
            if (
                !imgWrapperRef.current ||
                !titleRef.current ||
                !descRef.current ||
                meals.length === 0 ||
                !imgLoaded
            )
                return;

            const element = imgWrapperRef.current;
            gsap.set(element, { zIndex: 50 });

            // ---- TITLE SPLIT ----
            const split = SplitText.create(titleRef.current, {
                type: "chars"
            });

            // ---- FLIP ----
            const state = Flip.getState(element);
            element.classList.remove("recipe-hero");

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            // title initial state
            tl.set(favIconRef.current, { opacity: 0, yPercent: 100 });
            tl.set(titleRef.current, { visibility: "visible" });
            tl.set(split.chars, { y: 30, opacity: 0 });

            // Border radius animation
            tl.to(
                element,
                {
                    borderRadius: 30,
                    duration: 1.5,
                    delay: .3
                },
            );
            
            // Hero reverse animation - fixed → layout
            tl.add(
                Flip.from(state, {
                    duration: 1,
                    absolute: true,
                    ease: "power3.inOut",
                }),
                "-=1.2"
            );

            tl.to(
                favIconRef.current,
                {
                    opacity: 1,
                    yPercent: 0,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.3)"
                },
                "-=.4"
            )

            // Title animation
            tl.to(
                split.chars,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.02,
                    ease: "power1.out"
                },
                "-=0.8"
            );
            
            // Description fade-in
            tl.to(
                descRef.current,
                {   
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.3,
                    ease: "power2.out"
                },
                "-=100%"
            );

            return () => {
                split.revert();
            };
        },
        { dependencies: [meals, imgLoaded] }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error.message}</p>;
    if (meals.length === 0) return <p>No single meal found.</p>;

    return (
        <section className="flex flex-col gap-8 max-w-5xl mx-auto">
            <h1
                ref={titleRef}
                className="text-4xl font-bold text-center invisible"
            >
                {meals[0].strMeal}
            </h1>
            <div
                ref={imgWrapperRef}
                className="recipe-hero relative overflow-hidden"
            >
                {imgLoaded && 
                    <FavouriteTogglerIcon ref={favIconRef} position="absolute" color="#FFFFFF" saved={favourites.includes(meals[0].idMeal)} handleClick={toggleFavourite} id={meals[0].idMeal} />
                }
                <img
                    src={`${meals[0].strMealThumb}/large`}
                    alt={meals[0].strMeal}
                    onLoad={() => 
                        setTimeout(() => {
                            setImgLoaded(true)        
                        }, 500)}
                    className={`w-full h-[clamp(250px,60vh,450px)] object-cover transition-all duration-700
          ${imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
                />
            </div>

            <div
                ref={descRef}
                className="flex flex-col gap-8 invisible opacity-0"
            >
                <div className="flex max-md:flex-col gap-8">
                    <div className="flex-2">
                        <h2 className="text-xl font-medium mb-3">Instructions</h2>
                        <p>
                            {meals[0].strInstructions}
                        </p>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-medium mb-3">Ingredients</h2>
                        <ul>
                            {getIngredients(meals[0]).map((item, index) => (
                                <li key={index}>
                                    {item.measure} {item.ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button className="self-center" size={"lg"} asChild>
                    <Link to="/">
                        <ArrowLeftIcon />
                        Back to Home
                    </Link>
                </Button>
            </div>
          <BackgroundLines />
        </section>
    );
};

export default PageRecipe;
