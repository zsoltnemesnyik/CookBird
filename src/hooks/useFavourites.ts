import { useEffect, useState } from "react";

const STORAGE_KEY = import.meta.env.VITE_FAVOURITES_STORAGE_KEY;

export const useFavourites = () => {
    const [favourites, setFavourites] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    }, [favourites]);

    const addFavourite = (id: string) => {
        if (favourites.includes(id)) return;
        setFavourites([...favourites, id]);
    };

    return {
        favourites,
        addFavourite,
    };
};
