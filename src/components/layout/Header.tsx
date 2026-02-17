import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="sticky top-0 bg-white z-10">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl">
              <span>COOKBIRD</span>
            </Link>
            <nav>
                <ul className="flex max-md:flex-col gap-5">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
export default Header