import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  price: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 0.3,
  bacon: 0.8
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      let updatedState = { ...state };

      updatedState.ingredients[action.payload.ingType] =
        updatedState.ingredients[action.payload.ingType] + 1;
      updatedState.price =
        state.price + INGREDIENT_PRICES[action.payload.ingType];
      return updatedState;

    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredients = { ...state.ingredients };
      if (updatedIngredients[action.payload.ingType]) {
        updatedIngredients[action.payload.ingType]--;
        return {
          ...state,
          ingredients: updatedIngredients,
          price: state.price - INGREDIENT_PRICES[action.payload.ingType]
        };
      } else {
        return state;
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload.ingredients,
        error: false,
        price: 4
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;
