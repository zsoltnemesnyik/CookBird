import gsap from "gsap";
import { Flip, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealApiResponse } from "../models/interfaces";

gsap.registerPlugin(Flip, SplitText);

const PageRecipe = () => {
    const { id } = useParams();

    const [imgLoaded, setImgLoaded] = useState(false);

    const imgWrapperRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);

    const { data, error, loading } = useFetch<MealApiResponse>(
        `${import.meta.env.VITE_BASE_API}/lookup.php?i=${id}`
    );

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

            // Title kezdőállapot timeline-on belül - a timeline elejére
            tl.set(titleRef.current, { visibility: "visible" });
            tl.set(split.chars, { y: 30, opacity: 0 });

            // Border radius animáció
            tl.to(
                element,
                {
                    borderRadius: 30,
                    duration: 1.5,
                    delay: .2
                },
            );
            
            // Hero visszaanimálás fixed → layout
            tl.add(
                Flip.from(state, {
                    duration: 1,
                    absolute: true,
                    ease: "power3.inOut",
                }),
                "-=1.2"
            );


            // Title animáció
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
                "-=0.1"
            );

            return () => {
                split.revert();
            };
        },
        { dependencies: [meals, imgLoaded] }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (meals.length === 0) return <p>No single meal found.</p>;

    return (
        <section className="pt-16 flex flex-col gap-8 max-w-4xl mx-auto">
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
                <img
                    src={meals[0].strMealThumb}
                    alt={meals[0].strMeal}
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-[clamp(250px,60vh,450px)] object-cover transition-all duration-700
          ${imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
                />
            </div>

            <p
                ref={descRef}
                className="text-lg invisible opacity-0"
            >
                {meals[0].strInstructions}
            </p>
        </section>
    );
};

export default PageRecipe;
