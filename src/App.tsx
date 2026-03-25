import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import PageMeals from "./pages/PageMeals";
import PageRecipe from "./pages/PageRecipe";
import PageSavedMeals from "./pages/PageSavedMeals";
import PageLoader from "./components/loader/PageLoader";
import Page404 from "./pages/Page404";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <PageLoader />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen flex flex-col container mx-auto p-4 py-20 relative z-10">
          <Routes>
            <Route path="/" element={<PageMeals />} />
            <Route path={`/meal/:id`} element={<PageRecipe />} />
            <Route path={`/favourites`} element={<PageSavedMeals />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
