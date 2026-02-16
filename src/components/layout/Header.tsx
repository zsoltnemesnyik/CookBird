const Header = () => {
  return (
    <header className="sticky top-0 bg-white z-10">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
            <span>COOKBIRD</span>
            <nav>
                <ul className="flex max-md:flex-col gap-5">
                    <li><a href="/">Home</a></li>
                    <li><a href="/favorites">Favorites</a></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
export default Header