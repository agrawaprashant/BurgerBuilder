import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/checkout-summary.component";
import ContactData from "../ContactData/contact-data.component";
class Checkout extends React.Component {
  //   constructor(props) {
  //     super(props);

  //   }
  state = {
    ingredients: {},
    totalPrice: 0
  };

  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    console.log(this.props);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.replace("/");
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.checkoutCancelledHandler}
          continueCheckout={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
