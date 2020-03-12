import React from "react";

import classes from "./navigation-items.module.css";
import NavigationItem from "./Navigation-Item/navigation-item.component";
const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Burger Buider
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navigationItems;
