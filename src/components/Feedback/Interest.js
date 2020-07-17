import React, { Component } from "react";
//import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
  InputLabel,
  Button,
} from "@material-ui/core";

//this component is for taking input on the user's interest level
class Interest extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = () => {
    this.props.history.push("/comments");
  };

  //set global state to local
  state = {
    input: {
      interest: 0,
    },
  };

  //capture the selected input target and assign it to interest
  handleChange = (event) => {
    this.setState({
      input: {
        interest: Number(event.target.value),
      },
    });
  };

  //take captured local state and send in an action payload to reducer
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({ type: "GET_INTEREST", payload: this.state.input.interest });
    console.log(this.state.input);
    //reset the state
    this.setState({
      input: {
        interest: 0,
      },
    });
    this.next();
  };
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4>
            <i>Your feedback is valued!</i>
          </h4>
        </header>
        <form>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Rating</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.input.interest}
              onChange={(event) => this.handleChange(event)}
            >
              <MenuItem value={0}>Zero</MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
              <MenuItem value={9}>Nine</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
            <FormHelperText>Choose rating from 0-10</FormHelperText>
            <p>
              <b>
                How interested are you in playing tennis after watching videos?
              </b>
            </p>
          </FormControl>
          <Button
            id="review"
            variant="contained"
            color="primary"
            type="submit"
            onClick={(event) => this.handleClick(event)}
          >
            Next
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(Interest));
