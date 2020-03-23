import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const orders = state.orders.concat({
        ...action.payload.orderData,
        id: action.payload.orderId
      });
      return {
        ...state,
        orders: orders,
        loading: false,
        purchased: true
      };

    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default reducer;
