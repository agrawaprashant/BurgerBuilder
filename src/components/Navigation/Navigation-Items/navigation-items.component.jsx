import React from "react";

import classes from "./navigation-items.module.css";
import NavigationItem from "./Navigation-Item/navigation-item.component";
const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Buider
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
