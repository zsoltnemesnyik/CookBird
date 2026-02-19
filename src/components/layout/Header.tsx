import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Link } from "react-router-dom"

const Header = () => {
  useGSAP(() => {
    gsap.from("header", {
      opacity: 0,
      duration: .5,
      delay: 1.25,
      ease: "power2.in",
    })
  })

  return (
    <header className="fixed w-full top-0 z-20">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl">
              <span>COOKBIRD</span>
            </Link>
            <nav>
                <ul className="flex max-md:flex-col gap-5">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/favorites">Favourites</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
export default Header