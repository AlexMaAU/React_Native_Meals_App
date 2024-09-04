import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(id) {
    setFavoriteMealIds((prevIds) => [...prevIds, id]);
  }

  function removeFavorite(id) {
    const updatedIds = favoriteMealIds.filter(
      (favoriteMealId) => favoriteMealId !== id
    );
    setFavoriteMealIds(updatedIds);
  }

  return (
    <FavoritesContext.Provider
      value={{ ids: favoriteMealIds, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);

  return { ids, addFavorite, removeFavorite };
}

export default FavoritesContextProvider;

