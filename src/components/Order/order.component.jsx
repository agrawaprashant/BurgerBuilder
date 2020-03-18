import React from "react";
import classes from "./order.module.css";
const Order = props => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: salad(1), meat(1)</p>
      <p>
        Price: <strong>USD 5.5</strong>
      </p>
    </div>
  );
};

export default Order;
