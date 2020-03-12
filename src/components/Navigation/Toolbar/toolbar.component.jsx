import React from "react";

import classes from "./toolbar.module.css";
import Navigationitems from "../Navigation-Items/navigation-items.component";
import Logo from "../../Logo/logo.componenet";
import DrawerToggler from "./Side-Toggler/side-toggler.component";
const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggler clicked={props.showDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <Navigationitems />
    </nav>
  </header>
);

export default toolbar;
