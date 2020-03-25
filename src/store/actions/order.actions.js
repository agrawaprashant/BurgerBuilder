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

export const makeOrder = (orderData, token) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post(
        "/orders.json?auth=" + token,
        orderData
      );
      dispatch(purchaseOrderSuccess(response.data.name, orderData));
    } catch (err) {
      console.log(err);
      dispatch(purchaseOrderFailed(err));
    }
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
      orders: orders
    }
  };
};

const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED
  };
};

export const fetchOrders = (token, userId) => {
  return async dispatch => {
    try {
      dispatch(fetchOrdersStart());
      const queryParams =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      const res = await axios.get("/orders.json" + queryParams);
      const orders = [];
      for (let key in res.data) {
        orders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(orders));
    } catch (err) {
      console.log(err);
      dispatch(fetchOrdersFailed());
    }
  };
};
