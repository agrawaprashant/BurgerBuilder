import React from "react";

import classes from "./side-drawer.module.css";
import Logo from "../../Logo/logo.componenet";
import NavigationItems from "../Navigation-Items/navigation-items.component";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuth={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
