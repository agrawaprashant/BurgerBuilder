import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

const purchaseOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData: orderData
    }
  };
};

const purchaseOrderFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload: {
      error: error
    }
  };
};

export const makeOrder = orderData => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post("/orders.json", orderData);
      dispatch(purchaseOrderSuccess(response.data.name, response.data));
    } catch (err) {
      dispatch(purchaseOrderFailed(err));
    }
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  };
};
