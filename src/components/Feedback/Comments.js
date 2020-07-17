import React, { Component } from "react";
//import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormControl, Input, Button, InputLabel } from "@material-ui/core";

//this component is for taking input on the user's comments
class Comments extends Component {
  //this function takes you ro the next page in the steps
  next = (event) => {
    this.props.history.push("/review");
  };

  //set global state to local
  state = {
    input: {
      comments: "",
    },
  };

  //capture the selected input target and assign it to comments
  handleChange = (event) => {
    this.setState({
      input: {
        comments: event.target.value,
      },
    });
  };

  //take captured local state and send in an action payload to reducer
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({ type: "GET_COMMENTS", payload: this.state.input.comments });
    //reset the state
    this.setState({
      input: {
        comments: "",
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
            <InputLabel id="demo-simple-select-helper-label">
              Comments
            </InputLabel>
            <Input
              placeholder="Add comments"
              onChange={(event) => this.handleChange(event)}
            ></Input>
          </FormControl>
          <p>
            <b>Any Comments you wish to leave!</b>
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
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(Comments));
