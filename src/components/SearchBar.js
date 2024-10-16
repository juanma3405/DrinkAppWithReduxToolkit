import ApiDrinkService from "../services/ApiDrinkService.service";
import { useState } from "react";
import searchImage from "../assets/search.svg";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/search";
import { searchFailedActions } from "../store/searchFailed";
import { errorActions } from "../store/error";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiDrinkService.getCocktail(query);
      const searchDrinks = response.drinks || [];
      if (searchDrinks.length === 0) {
        dispatch(searchFailedActions.setSearchFailed());
      }
      const searchResults = searchDrinks.map((drink) => ({
        idDrink: drink.idDrink,
        name: drink.strDrink,
        urlImage: drink.strDrinkThumb,
      }));
      dispatch(searchActions.setDrinks({ drinks: searchResults }));
    } catch (error) {
      dispatch(errorActions.setError());
      console.error("Error searching for cocktails:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="form-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a cocktail..."
      />
      <button type="submit">
        <img src={searchImage} alt="Search" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
