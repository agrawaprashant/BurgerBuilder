import React from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/input.component";
import Spinner from "../../components/UI/Spinner/spinner.component";

import * as actions from "../../store/actions/actions";
import { connect } from "react-redux";

import classes from "./auth.module.css";

export class Auth extends React.Component {
  state = {
    authFormControls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Email"
        },
        value: "",
        validationRules: {
          isRequired: true,
          isEmail: true
        },
        touched: false,
        valid: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password"
        },
        value: "",
        validationRules: {
          isRequired: true
        },
        touched: false,
        valid: false
      }
    },
    isSignup: true
  };

  formValidationCheck(value, validationRules) {
    let valid = true;
    if (validationRules.isRequired) {
      valid = value.trim() !== "" && valid;
    }

    return valid;
  }

  formChangedHandler(event, ctrl) {
    const updatedForm = { ...this.state.authFormControls };
    const updatedFormControl = updatedForm[ctrl];

    updatedFormControl.touched = true;
    updatedFormControl.valid = this.formValidationCheck(
      event.target.value,
      updatedFormControl.validationRules
    );

    updatedFormControl.value = event.target.value;
    updatedForm[ctrl] = updatedFormControl;
    this.setState({ authFormControls: updatedForm });
  }

  authSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authFormControls.email.value,
      this.state.authFormControls.password.value,
      this.state.isSignup
    );
  };

  authSwitchHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const authFormControls = [];
    for (let key in this.state.authFormControls) {
      authFormControls.push({
        controlName: key,
        elementType: this.state.authFormControls[key].elementType,
        elementConfig: this.state.authFormControls[key].elementConfig,
        value: this.state.authFormControls[key].value,
        touched: this.state.authFormControls[key].touched,
        valid: this.state.authFormControls[key].valid
      });
    }

    let authFormInputs = authFormControls.map(control => {
      return (
        <Input
          key={control.controlName}
          elementType={control.elementType}
          elementConfig={control.elementConfig}
          valid={control.valid}
          touched={control.touched}
          value={control.value}
          changed={event => this.formChangedHandler(event, control.controlName)}
        />
      );
    });
    if (this.props.loading) {
      authFormInputs = <Spinner />;
    }

    let error = null;
    if (this.props.error) {
      error = <p style={{ color: "#d9534f" }}>{this.props.error.message}</p>;
    }
    const buttonClasses = [];
    if (this.state.isSignup) {
      buttonClasses.push(classes.SignupBtn);
    } else {
      buttonClasses.push(classes.SigninBtn);
    }

    let redirect = null;
    if (
      this.props.isAuthenticated &&
      this.props.buildingBurger &&
      this.props.burgerPrice > 4
    ) {
      redirect = <Redirect to="/checkout" />;
    } else if (
      (this.props.isAuthenticated && !this.props.buildingBurger) ||
      +(this.props.isAuthenticated && this.props.burgerPrice <= 4)
    ) {
      redirect = <Redirect to="/" />;
    } else {
      redirect = null;
    }
    return (
      <form onSubmit={this.authSubmitHandler} className={classes.AuthForm}>
        {error}
        {redirect}
        {authFormInputs}
        <button className={buttonClasses.join(" ")}>
          {this.state.isSignup ? "Sign Up" : "Sign In"}
        </button>
        <button
          className={classes.SwitchBtn}
          onClick={this.authSwitchHandler}
          type="button"
        >
          Switch to {this.state.isSignup ? "Sign In" : "Sign Up "} instead!
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.bgr.building,
    burgerPrice: state.bgr.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
