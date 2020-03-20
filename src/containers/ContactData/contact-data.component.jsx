import React from "react";
import Button from "../../components/UI/Button/button.component";
import Spinner from "../../components/UI/Spinner/spinner.component";
import axios from "../../axios-orders";
import classes from "./contact-data.module.css";
import Input from "../../components/UI/Input/input.component";

class ContactData extends React.Component {
  state = {
    formData: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP"
        },
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },

      deliveryMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayName: "Fastest" },
            { value: "cheapest", displayName: "Cheapest" }
          ],
          placeholder: "Select a Delivery Option"
        },
        value: ""
      }
    },
    loading: false
  };

  inputChangedhandler = (event, inputChangedIdentifier) => {
    const updatedFormData = { ...this.state.formData };
    const updatedFormElement = {
      ...this.state.formData[inputChangedIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormData[inputChangedIdentifier] = updatedFormElement;
    this.setState({ formData: updatedFormData });
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };

    const customerDetails = {};
    for (let formEl in this.state.formData) {
      if (formEl === "deliveryMode") {
        order.deliveryMode = this.state.formData[formEl].value;
      } else {
        customerDetails[formEl] = this.state.formData[formEl].value;
      }
    }

    order.customer = customerDetails;
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
    let formElementsArray = [];
    for (let formOb in this.state.formData) {
      formElementsArray.push({
        element: formOb,
        elementType: this.state.formData[formOb].elementType,
        config: this.state.formData[formOb].elementConfig,
        value: this.state.formData[formOb].value
      });
    }

    let contactForm = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.element}
              elementType={formElement.elementType}
              elementConfig={formElement.config}
              value={formElement.value}
              changed={event =>
                this.inputChangedhandler(event, formElement.element)
              }
            />
          );
        })}

        <Button btnType="Success">ORDER</Button>
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
