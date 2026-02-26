import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = import.meta.env.VITE_FAVOURITES_STORAGE_KEY;

type FavouritesContextType = {
  favourites: string[];
  toggleFavourite: (id: string) => void;
};

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id: string) => {
    setFavourites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return context;
};