import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/checkout-summary.component";
import ContactData from "../ContactData/contact-data.component";
import { connect } from "react-redux";
class Checkout extends React.Component {
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
          ingredients={this.props.ings}
          cancelCheckout={this.checkoutCancelledHandler}
          continueCheckout={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.price
  };
};

export default connect(mapStateToProps)(Checkout);
