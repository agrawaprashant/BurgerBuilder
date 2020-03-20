import React from "react";
import classes from "./order.module.css";
const Order = props => {
  const ingredients = [];
  for (let igKey in props.ingredients) {
    ingredients.push({ name: igKey, amount: props.ingredients[igKey] });
  }

  const ingSpan = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          border: "1px solid #ccc",
          padding: "5px 10px",
          margin: "0 5px",
          borderRadius: "5px",
          background: "#f4f4f4"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingSpan} </p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong>
      </p>
    </div>
  );
};

export default Order;
