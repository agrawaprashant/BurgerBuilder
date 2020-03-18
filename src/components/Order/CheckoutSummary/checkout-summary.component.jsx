import React from "react";
import Burger from "../../Burger/burger.component";
import Button from "../../UI/Button/button.component";
import classes from "./checkout-summary.module.css";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelCheckout}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continueCheckout}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
