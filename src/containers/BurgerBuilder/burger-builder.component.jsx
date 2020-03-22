import React from "react";

import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/burger.component";
import BuildControls from "../../components/Burger/BuildControls/build-controls.component";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/order-summary.component";
import Spinner from "../../components/UI/Spinner/spinner.component";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

import axios from "../../axios-orders";
import { connect } from "react-redux";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: null
  };

  async componentDidMount() {
    // try {
    //   const ingredients = await axios.get("/ingredients.json");
    //   this.setState({ ingredients: ingredients.data });
    // } catch (err) {
    //   this.setState({ error: err });
    // }
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
    this.props.history.push("/checkout");
  };
  render() {
    const disabledControls = {
      ...this.props.ingredients
    };

    for (let key in disabledControls) {
      disabledControls[key] = disabledControls[key] <= 0;
    }

    let burger = this.state.error ? "Ingredients not found!" : <Spinner />;
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ingredients: state.ingredients,
    totalPrice: state.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingType =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingType: ingType }
      }),
    onIngredientRemoved: ingType =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingType: ingType }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
