import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./hoc/Layout/layout.compoennt";
import BurgerBuilder from "./containers/BurgerBuilder/burger-builder.component";
import Checkout from "./containers/Checkout/checkout.component";
import Orders from "./containers/Orders/orders.component";
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
