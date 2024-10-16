import { randomDrinkActions } from "./randomdrink";
import { errorActions } from "./error";
import ApiDrinkService from "../services/ApiDrinkService.service";

export const fetchRandomDrink = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const response = await ApiDrinkService.getRandomCocktail();
        const drinkData = response.drinks[0];
        const newDrink = {
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
        while (drinkData[nroIngredient] != null) {
          newDrink.ingredients.push(drinkData[nroIngredient]);
          newDrink.ingmeasures.push(drinkData[nroIngMeasure]);
          i++;
          nroIngredient = "strIngredient" + i;
          nroIngMeasure = "strMeasure" + i;
        }
        dispatch(randomDrinkActions.setRandomDrink({ drink: newDrink }));
      } catch (error) {
        dispatch(errorActions.setError());
        console.error("Error fetching the random drink:", error);
      }
    };
    fetchData();
  };
};
