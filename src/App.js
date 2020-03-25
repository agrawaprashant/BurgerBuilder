import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

import "./App.css";
import Layout from "./hoc/Layout/layout.compoennt";
import BurgerBuilder from "./containers/BurgerBuilder/burger-builder.component";
import Checkout from "./containers/Checkout/checkout.component";
import Orders from "./containers/Orders/orders.component";
import Auth from "./containers/Auth/auth.component";
import Logout from "./containers/Auth/Logout/logout.component";
class App extends React.Component {
  componentDidMount() {
    this.props.onCheckAuthentiacation();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
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
