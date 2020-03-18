import React from "react";
import Button from "../../components/UI/Button/button.component";
import Spinner from "../../components/UI/Spinner/spinner.component";
import axios from "../../axios-orders";
import classes from "./contact-data.module.css";
class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Prashant Agrawal",
        address: {
          street: "Electronic City",
          zipCode: 12313,
          country: "India"
        },
        email: "agrawaprashant@gamil.com"
      },
      deliveryMode: "Express"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    let contactForm = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      contactForm = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {contactForm}
      </div>
    );
  }
}

export default ContactData;
