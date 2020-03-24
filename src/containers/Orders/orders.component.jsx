import React from "react";
import Order from "../../components/Order/order.component";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner.component";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

class Orders extends React.Component {
  async componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    let orders = null;
    if (this.props.loading) {
      orders = <Spinner />;
    } else {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }

    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));
