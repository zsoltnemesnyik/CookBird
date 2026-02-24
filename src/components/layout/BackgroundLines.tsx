import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BackgroundLines = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll("span");

    gsap.fromTo(
      lines,
      {
        opacity: .5,
        background: "hsla(0, 0%, 0%, 1)",
        yPercent: (i) => (i % 2 === 0 ? 50 : -50),
      },
      {
        background: "hsla(0, 0%, 0%, .05)",
        opacity: 1,
        yPercent: 0,
        duration: .75,
        ease: "power3.out",
        stagger: 0.05,
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10"
    >
      <span className="absolute left-1/4 top-0 w-px h-screen " />
      <span className="absolute left-1/2 top-0 w-px h-screen " />
      <span className="absolute left-3/4 top-0 w-px h-screen " />
    </div>
  );
};

export default BackgroundLines;
