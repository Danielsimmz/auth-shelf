import React, { Component } from "react";
//import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
//this component is for taking input on how the user feels interested
class Interest extends Component {
  next = () => {
    
    this.props.history.push("/comments");
  };

  //this function takes user to previous page
  previous = () => {
    
    this.props.history.push("/quality");
  };

  //set state to local variable
  state = {
    input: {
      interest: 0,
    },
  };

  //capture input value
  handleChange = (event) => {
    this.setState({
      input: {
        interest: Number(event.target.value),
      },
    });
  };
  //store input value in global state
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
        <p>
          <b>How interested are you in playing tennis after watching videos?</b>
        </p>
        {/*on submission this form will take you to the next page in the process */}
        <form >
          <button
            variant="container"
            color="primary"
            onClick={() => this.previous()}
          >
            Previous
          </button>
          <input
            placeholder="Choose from 1-10"
            type="number"
            min="0"
            max="10"
            onChange={(event) => this.handleChange(event)}
          ></input>
          {/*<select>
            <menuitem value="number">Delivery</menuitem>
          </select>*/}
          <button
            id="review"
            variant="container"
            color="primary"
            type="submit"
            onClick={(event) => this.handleClick(event)}
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(Interest));