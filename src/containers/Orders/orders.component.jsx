import React from "react";
import Order from "../../components/Order/order.component";
class Orders extends React.Component {
  render() {
    return (
      <div>
        <Order />
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;