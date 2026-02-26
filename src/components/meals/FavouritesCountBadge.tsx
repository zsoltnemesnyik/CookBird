import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FavouritesCountBadge = ({ count }: { count: number }) => {
  const badgeRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (!badgeRef.current) return;

    gsap.fromTo(
      badgeRef.current,
      { scale: 1 },
      {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  }, [count]);

  return (
    <span
      ref={badgeRef}
      className="absolute bottom-[calc(100%-10px)] right-[-15%] text-xs bg-black text-white w-5 h-5 flex justify-center items-center aspect-square rounded-full"
    >
      {count}
    </span>
  );
};

export default FavouritesCountBadge;