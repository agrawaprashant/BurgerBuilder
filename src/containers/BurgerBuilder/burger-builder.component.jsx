import React from "react";

import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/burger.component";
import BuildControls from "../../components/Burger/BuildControls/build-controls.component";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/order-summary.component";
import Spinner from "../../components/UI/Spinner/spinner.component";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/actions";

import axios from "../../axios-orders";
import { connect } from "react-redux";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false
  };

  async componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandle = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    if (this.props.isAuthenticated) {
      this.props.history.push("/checkout");
    } else {
      this.props.history.push("/auth");
    }
  };
  render() {
    const disabledControls = {
      ...this.props.ingredients
    };

    for (let key in disabledControls) {
      disabledControls[key] = disabledControls[key] <= 0;
    }

    let burger = this.props.error ? "Ingredients not found!" : <Spinner />;
    let orderSummary = null;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={igType => this.props.onIngredientAdded(igType)}
            ingredientRemoved={igType => this.props.onIngredientRemoved(igType)}
            disabled={disabledControls}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandle}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          continuePurchasing={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.bgr.ingredients,
    totalPrice: state.bgr.price,
    error: state.bgr.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingType => dispatch(actions.addIngredient(ingType)),
    onIngredientRemoved: ingType => dispatch(actions.removeIngredient(ingType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
