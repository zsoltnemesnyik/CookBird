import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import AnimatedIcon from "./AnimatedIcon";

gsap.registerPlugin(SplitText);

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !containerRef.current || !iconRef.current) return;

      const splitText = SplitText.create(textRef.current, { type: "chars" });

      const order = [3, 0, 5, 1, 6, 2, 4, 7];
      const orderMap = new Map(order.map((val, idx) => [val, idx]));

      const getReverseDelay = (i: number) =>
        (order.length - 1 - (orderMap.get(i) ?? 0)) * 0.08;

      const getDelay = (i: number) => (orderMap.get(i) ?? 0) * 0.08;

      gsap.set(splitText.chars, {
        scaleY: 1,
        transformOrigin: "center bottom",
      });

      gsap.set(iconRef.current, { opacity: 0 });

      gsap.set(containerRef.current, {
        alignItems: "flex-end",
        paddingBottom: isMobile ? "25vh" : 0,
      });

      const vh = window.visualViewport?.height || window.innerHeight;
      const textHeight = textRef.current.offsetHeight;
      const effectiveVh = isMobile ? vh * 0.5 : vh;
      const scale = effectiveVh / textHeight;

      const tl = gsap.timeline();

      // --- 1. Felirat nyújtása ---
      tl.to(splitText.chars, {
        scaleY: scale,
        duration: 0.5,
        ease: "power4.out",
        delay: (i) => getDelay(i),
      });

      // --- 2. Transform-origin + alignment váltás ---
      tl.add(() => {
        gsap.set(splitText.chars, { transformOrigin: "center top" });
        gsap.set(containerRef.current, {
          alignItems: "flex-start",
          paddingBottom: 0,
          paddingTop: isMobile ? "25vh" : 0,
        });
      });

      // --- 3. Felirat visszahúzása ---
      tl.to(splitText.chars, {
        scaleY: 1,
        duration: 0.75,
        ease: "elastic.out(1,0.5)",
        delay: (i) => getReverseDelay(i),
      });

      // --- 4. Icon fade-in és steam animáció ---
      const steamWaves = iconRef.current.querySelectorAll(".steamwaves");

      tl.to(
        iconRef.current,
        { opacity: 1, duration: 1.3, ease: "power3.out" },
        "-=0.5",
      );

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
        "-=1.0",
      );

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

      // --- 5. Container fade-out ---
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
        splitText.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="page-loader fixed inset-0 flex justify-center bg-background overflow-hidden z-9999 leading-none"
    >
      <h1
        ref={textRef}
        className="text-black text-[12vw] font-bold select-none"
      >
        COOKBIRD
      </h1>
      <div className="h-dvh w-full absolute top-1/2 max-md:-translate-y-1/2 md:top-0 flex items-center justify-center">
        <AnimatedIcon ref={iconRef} />
      </div>
    </div>
  );
}
