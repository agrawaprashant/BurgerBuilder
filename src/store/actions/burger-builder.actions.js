import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingType: ingredient
    }
  };
};

export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingType: ingredient
    }
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients: {
        salad: ingredients.salad,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat
      }
    }
  };
};

const fetchIngredientsFaild = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const result = await axios.get("/ingredients.json");
      dispatch(setIngredients(result.data));
    } catch (err) {
      dispatch(fetchIngredientsFaild());
    }
  };
};
