import DrinkOfTheDay from "./components/DrinkOfTheDay.js";
import DrinkList from "./components/DrinkList.js";
import SearchFailed from "./components/SearchFailed.js";
import Error from "./components/Error.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomDrink } from "./store/randomDrink-actions.js";

function App() {
  const drinks = useSelector((state) => state.search.drinks);
  const selectedDrink = useSelector((state) => state.chosenDrink.drink);
  const searchFailed = useSelector((state) => state.searchFailed.searchFailed);
  const error = useSelector((state) => state.error.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRandomDrink());
  }, [dispatch]);

  if (error) {
    return <Error></Error>;
  }

  return (
    <>
      {searchFailed && <SearchFailed />}
      {(drinks.length === 0 || selectedDrink) && !searchFailed && (
        <DrinkOfTheDay />
      )}
      {drinks.length > 0 && !selectedDrink && !searchFailed && <DrinkList />}
    </>
  );
}

export default App;
