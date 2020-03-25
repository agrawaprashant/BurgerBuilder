import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  ingredients: null,
  price: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 0.3,
  bacon: 0.8
};

const addIngredient = (state, action) => {
  const newIngredient = {
    [action.payload.ingType]: state.ingredients[action.payload.ingType] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, newIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    price: state.price + INGREDIENT_PRICES[action.payload.ingType],
    building: true
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const newIngredient = {
    [action.payload.ingType]: state.ingredients[action.payload.ingType] - 1
  };
  const updatedIngredients = updateObject(state.ingredients, newIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    price: state.price - INGREDIENT_PRICES[action.payload.ingType],
    building: true
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    error: false,
    price: 4,
    building: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
