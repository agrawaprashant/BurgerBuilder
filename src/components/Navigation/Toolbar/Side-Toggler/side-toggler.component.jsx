import React from "react";
import classes from "./side-toggler.module.css";
const sideToggler = props => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default sideToggler;
