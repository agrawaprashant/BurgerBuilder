import React from "react";

import classes from "./burger.module.css";
import BurgerIngrediet from "./BurgerIngredient/burger-ingredient.component";
const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngrediet key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, acc) => {
      return arr.concat(acc);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngrediet type="bread-top" />
      {transformedIngredients}
      <BurgerIngrediet type="bread-bottom" />
    </div>
  );
};

export default burger;
