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

//this component is for taking input on the user's quality rating
class Quality extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = () => {
    this.props.history.push("/interest");
  };

  //set state to local variable
  state = {
    input: {
      quality: 0,
    },
  };

  //capture the selected input target and assign it to understanding
  handleChange = (event) => {
    this.setState({
      input: {
        quality: Number(event.target.value),
      },
    });
  };

  //take captured local state and send in an action payload to reducer
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({ type: "GET_QUALITY", payload: this.state.input.quality });
    //reset the state after submission
    this.setState({
      input: {
        quality: 0,
      },
    });
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
        <form onSubmit={() => this.next()}>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Rating</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.input.quality}
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
              <b>Rate the quality of the content!</b>
            </p>
            <Button
              id="review"
              color="primary"
              type="submit"
              variant="contained"
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

export default withRouter(connect()(Quality));
