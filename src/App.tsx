import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import PageMeals from "./pages/PageMeals";
import PageRecipe from "./pages/PageRecipe";
import PageSavedMeals from "./pages/PageSavedMeals";
import PageLoader from "./components/loader/PageLoader";

function App() {
  return (
    <>
      <PageLoader />
      <BrowserRouter>
        <Header />
        <main className="container mx-auto p-4 py-20 relative z-10">
          <Routes>
            <Route path="/" element={<PageMeals />} />
            <Route path={`/meal/:id`} element={<PageRecipe />} />
            <Route path={`/favourites`} element={<PageSavedMeals />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
