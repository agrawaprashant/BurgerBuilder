import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

import "./App.css";
import Layout from "./hoc/Layout/layout.compoennt";
import BurgerBuilder from "./containers/BurgerBuilder/burger-builder.component";

import Logout from "./containers/Auth/Logout/logout.component";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/auth.component");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/orders.component");
});
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/checkout.component");
});

class App extends React.Component {
  componentDidMount() {
    this.props.onCheckAuthentiacation();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <BrowserRouter>
          <Layout>{routes}</Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthentiacation: () => dispatch(actions.checkAuthentication())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
