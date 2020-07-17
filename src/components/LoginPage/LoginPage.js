import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Typography,
  Link,
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
 copyright=() => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  render() {
    return (
      <div className="home">
        <span>
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
        </span>
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
                placeholder="name@example.com"
                variant="contained"
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
                placeholder="xxxxxx"
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
            <Input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className="link-button text-center"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </Button>
        </center>
        {this.copyright}
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

export default (withRouter)(connect(mapStateToProps)(LoginPage));
