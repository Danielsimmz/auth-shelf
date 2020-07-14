import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Understanding extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = () => {
    this.props.history.push("/quality");
  };

  //set state to local variable
  state = {
    input: {
      understanding: 0,
    },
  };
  //capture the input target
  handleChange = (event) => {
    this.setState({
      input: {
        understanding: Number(event.target.value),
      },
    });
  };
  //store input value in global state
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "GET_UNDERSTANDING",
      payload: this.state.input.understanding,
    });
    console.log(this.state.input);
    //reset the state after submission
    this.setState({
      input: {
        understanding: 0,
      },
    });
    this.next();
  };
  //this function takes user to previous page
  previous = () => {
    
    this.props.history.push("/home");
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
          <b>How well are you understanding the content</b>
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

export default withRouter(connect()(Understanding));
