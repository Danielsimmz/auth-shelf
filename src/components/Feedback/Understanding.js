import React, { Component } from "react";
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

//this component is for taking input on the user's understanding of content
class Understanding extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = () => {
    this.props.history.push("/quality");
  };

  //set global state to local
  state = {
    input: {
      understanding: 0,
    },
  };

  //capture the selected input target and assign it to understanding
  handleChange = (event) => {
    this.setState({
      input: {
        understanding: Number(event.target.value),
      },
    });
  };

  //take captured local state and send in an action payload to reducer
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "GET_UNDERSTANDING",
      payload: this.state.input.understanding,
    });
    //reset the state after submission
    this.setState({
      input: {
        understanding: 0,
      },
    });
    this.next();
  };

  render() {
    return (
      <div>
        <header className="App-header user header">
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
              value={this.state.input.understanding}
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
              <b>How well are you understanding the content</b>
            </p>
            <Button
              id="review"
              variant="contained"
              color="primary"
              type="submit"
              onClick={(event) => this.handleClick(event)}
            >
              Next
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(Understanding));
