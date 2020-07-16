import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  next = () => {
    this.props.history.push("/home");
  };
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
    this.next();
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <FormControl className="margin">
              <InputLabel htmlFor="username" name="username">
                Email
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password" name="password">
                Password
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
