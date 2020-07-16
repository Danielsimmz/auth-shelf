import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <FormControl className="margin">
              <InputLabel htmlFor="username" name="username">
                Email
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={this.state.username}
                placeholder="name@example.com"
                onChange={this.handleInputChangeFor("username")}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div>
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
            <Input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className="link-button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

