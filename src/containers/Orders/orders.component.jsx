import React from "react";
import Order from "../../components/Order/order.component";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner.component";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends React.Component {
  state = {
    orders: [],
    loading: false
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/orders.json");
      const orders = [];
      for (let key in res.data) {
        orders.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({ orders: orders, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }
  render() {
    let orders = this.state.orders.map(order => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });

    if (this.state.loading) {
      orders = <Spinner />;
    }
    return orders;
  }
}

export default withError(Orders, axios);
