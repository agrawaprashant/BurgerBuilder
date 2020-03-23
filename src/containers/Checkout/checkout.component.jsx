import React from "react";
import { Route, Redirect } from "react-router-dom";
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
    let checkoutSummary = <Redirect to="/" />;
    let redirectComp;
    if (this.props.ings) {
      redirectComp = this.props.purchased ? <Redirect to="/" /> : null;
      checkoutSummary = (
        <CheckoutSummary
          ingredients={this.props.ings}
          cancelCheckout={this.checkoutCancelledHandler}
          continueCheckout={this.checkoutContinuedHandler}
        />
      );
    }
    return (
      <div>
        {redirectComp}
        {checkoutSummary}
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
    ings: state.bgr.ingredients,
    price: state.bgr.price,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
