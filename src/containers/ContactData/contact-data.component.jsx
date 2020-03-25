import React from "react";
import Button from "../../components/UI/Button/button.component";
import Spinner from "../../components/UI/Spinner/spinner.component";
import classes from "./contact-data.module.css";
import Input from "../../components/UI/Input/input.component";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/actions";

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
        },
        touched: false
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
        },
        touched: false
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
        },
        touched: false
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
          required: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false
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
        },
        touched: false
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
        value: "",
        valid: false,
        validationRules: {
          required: true
        },
        touched: false
      }
    },
    isFormValid: false,
    loading: false
  };

  validationCheck(value, rules) {
    let valid = true;
    if (rules.required) {
      valid = value.trim() !== "" && valid;
    }

    if (rules.minLength) {
      valid = value.trim().length >= 5 && valid;
    }
    if (rules.maxLength) {
      valid = value.trim().length <= 5 && valid;
    }

    return valid;
  }

  inputChangedhandler = (event, inputChangedIdentifier) => {
    const updatedFormData = { ...this.state.formData };
    const updatedFormElement = {
      ...this.state.formData[inputChangedIdentifier]
    };

    updatedFormElement.touched = true;

    updatedFormElement.valid = this.validationCheck(
      event.target.value,
      updatedFormElement.validationRules
    );

    updatedFormElement.value = event.target.value;
    updatedFormData[inputChangedIdentifier] = updatedFormElement;

    let formValid = true;
    for (let formEl in updatedFormData) {
      formValid = updatedFormData[formEl].valid && formValid;
    }

    this.setState({ formData: updatedFormData, isFormValid: formValid });
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      userId: this.props.userId
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
    this.props.onPurchaseBurger(order, this.props.token);
  };

  render() {
    let formElementsArray = [];
    for (let formOb in this.state.formData) {
      formElementsArray.push({
        element: formOb,
        elementType: this.state.formData[formOb].elementType,
        config: this.state.formData[formOb].elementConfig,
        value: this.state.formData[formOb].value,
        valid: this.state.formData[formOb].valid,
        touched: this.state.formData[formOb].touched
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
              valid={formElement.valid}
              touched={formElement.touched}
              changed={event =>
                this.inputChangedhandler(event, formElement.element)
              }
            />
          );
        })}

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.bgr.ingredients,
    price: state.bgr.price,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData, token) =>
      dispatch(orderActions.makeOrder(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
