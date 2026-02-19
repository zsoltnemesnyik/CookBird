import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import PageMeals from "./pages/PageMeals";
import PageRecipe from "./pages/PageRecipe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PageMeals />} />
            <Route path={`/meal/:id`} element={<PageRecipe />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
