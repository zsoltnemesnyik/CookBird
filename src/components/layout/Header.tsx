import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Link } from "react-router-dom"
import { usePageScrolled } from '@/hooks/usePageScrolled';

const Header = () => {
  const isScrolled = usePageScrolled();

  useGSAP(() => {
    gsap.from("header", {
      opacity: 0,
      duration: .5,
      delay: 1.25,
      ease: "power2.in",
    })
  })
  

  return (
    <header className={`fixed w-full top-0 z-20 transition-colors duration-700 ${isScrolled ? "bg-black/15 backdrop-blur-md" : ""}`}>
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl">
              <span>COOKBIRD</span>
            </Link>
            <nav>
                <ul className={`flex max-md:flex-col gap-5 transition-colors duration-700 ${isScrolled ? "text-white" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/favourites">Favourites</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
export default Header