import * as actionTypes from "../../actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  price: 4
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
      }else{
          return state
      }

    default:
      return state;
  }
};

export default reducer;
