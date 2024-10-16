import ApiDrinkService from "../services/ApiDrinkService.service";
import { useSelector, useDispatch } from "react-redux";
import { chosenDrinkActions } from "../store/chosenDrink";
import { searchActions } from "../store/search";
import { errorActions } from "../store/error";
import "./DrinkList.css";

const DrinkList = () => {
  const drinks = useSelector((state) => state.search.drinks);
  const dispatch = useDispatch();

  const choseDrink = async (drink) => {
    let newDrink;
    let idDrink;
    try {
      if (drink.idDrink !== undefined) {
        idDrink = drink.idDrink?.toString();
      }
      const response = await ApiDrinkService.getCocktailDetail(idDrink);
      const drinkData = response.drinks[0];
      newDrink = {
        idDrink: drinkData.idDrink,
        name: drinkData.strDrink,
        instructions: drinkData.strInstructions,
        urlImage: drinkData.strDrinkThumb,
        ingredients: [],
        ingmeasures: [],
      };
      let i = 1;
      let nroIngredient = "strIngredient" + i;
      let nroIngMeasure = "strMeasure" + i;
      while (drinkData[nroIngredient] !== null) {
        newDrink.ingredients.push(drinkData[nroIngredient]);
        newDrink.ingmeasures.push(drinkData[nroIngMeasure]);
        i++;
        nroIngredient = "strIngredient" + i;
        nroIngMeasure = "strMeasure" + i;
      }
      dispatch(chosenDrinkActions.setChosenDrink({ drink: newDrink }));
    } catch (error) {
      dispatch(errorActions.setError());
      console.error("Error fetching drink data: ", error);
    }
  };

  const backToInit = () => {
    dispatch(searchActions.cleanSearch());
  };

  return (
    <>
      <div className="grid-container">
        {drinks.map((drink) => (
          <li key={drink.idDrink} className="grid-item">
            <img
              src={drink.urlImage}
              onClick={() => choseDrink(drink)}
              alt="Drink"
              style={{ cursor: "pointer" }}
            />
            <p>{drink.name}</p>
          </li>
        ))}
      </div>
      <button className="btn-style" onClick={backToInit}>
        Back to drink of the day
      </button>
    </>
  );
};

export default DrinkList;
