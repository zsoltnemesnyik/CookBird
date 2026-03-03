import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import AnimatedIcon from "./AnimatedIcon";

gsap.registerPlugin(SplitText);

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (
        !bottomRef.current ||
        !topRef.current ||
        !containerRef.current ||
        !iconRef.current
      )
        return;

      const splitBottom = SplitText.create(bottomRef.current, {
        type: "chars",
      });
      const splitTop = SplitText.create(topRef.current, { type: "chars" });

      gsap.set(splitBottom.chars, { scaleY: 1, transformOrigin: "bottom" });
      gsap.set(splitTop.chars, { transformOrigin: "top" });
      gsap.set(topRef.current, { opacity: 0 });
      gsap.set(iconRef.current, { opacity: 0 });

      const vh = window.innerHeight;
      const bottomHeight = bottomRef.current.offsetHeight;
      const topHeight = topRef.current.offsetHeight;
      const bottomScale = vh / bottomHeight;
      const topScale = vh / topHeight;

      const tl = gsap.timeline();

      // --- bottom felirat felnyit ---
      tl.to(splitBottom.chars, {
        scaleY: bottomScale,
        duration: 0.75,
        ease: "power4.out",
        stagger: { amount: 0.5, from: "random" }
      });
      tl.to(
        splitTop.chars,
        { scaleY: topScale, duration: 0.75, ease: "power4.out" },
        "<",
      );

      tl.add(() => {
        gsap.set(bottomRef.current, { opacity: 0 });
        gsap.set(topRef.current, { opacity: 1 });
      });

      tl.to(splitTop.chars, {
        scaleY: 1,
        duration: 1,
        ease: "elastic.out(1,0.5)",
        stagger: { amount: 0.5, from: "random" },
      });

      // --- IKON + GŐZÖK ---
      const steamWaves = iconRef.current.querySelectorAll(".steamwaves");

      // ikon fade-in
      tl.to(
        iconRef.current,
        { opacity: 1, duration: 1.3, ease: "power3.out" },
        "<0.5",
      );

      // steam megjelenés animáció
      tl.fromTo(
        steamWaves,
        { y: 48, opacity: 0, scale: 0.75, transformOrigin: "center bottom" },
        {
          y: 0,
          opacity: 0.6,
          scale: 1,
          duration: 2.4,
          ease: "back.out(1.2)",
          stagger: { each: 0.35, from: "center" },
        },
        "<0.2",
      );

      // folyamatos hullámzás
      gsap.to(steamWaves, {
        keyframes: [
          {
            y: -6,
            scaleY: 1.08,
            scaleX: 1.04,
            skewX: 1.8,
            rotation: 0.6,
            duration: 4.2,
          },
        ],
        ease: "sine.inOut",
        repeat: -1,
        stagger: { each: 0.7, from: "random" },
      });

      // --- container fade-out ---
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(containerRef.current, { display: "none" });
          },
        },
        "-=1",
      );

      return () => {
        splitBottom.revert();
        splitTop.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="page-loader fixed inset-0 bg-background overflow-hidden z-9999 leading-none"
    >
      <div className="absolute inset-0 flex items-start justify-center">
        <h1
          ref={topRef}
          className="text-black text-[12vw] font-bold leading-none select-none"
        >
          Cookbird
        </h1>
        <div className="h-[150vh] w-full absolute top-0 flex items-center justify-center">
          <AnimatedIcon ref={iconRef} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-end justify-center">
        <h1
          ref={bottomRef}
          className="text-black text-[12vw] font-bold leading-none select-none"
        >
          Cookbird
        </h1>
      </div>
    </div>
  );
}
