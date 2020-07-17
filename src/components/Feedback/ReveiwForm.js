import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "@material-ui/core";

class ReviewForm extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = () => {
    this.props.history.push("/home");
  };
  submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to submit this review?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.postFeedback(),
        },
        {
          label: "No",
          onClick: () => this.setState({ redirect: true }),
        },
      ],
    });
  };

  //this function takes user to previous page
  //   previous = (event) => {
  //     event.preventDefault();
  //     this.props.history.push("/comments");
  //   };
  //this function loops through the array of feedback and
  postFeedback = () => {
    console.log(`FEEDBACK POST IS: `, this.props.user);
    const payload = { feedback: this.props.feedback, user: this.props.user };
    axios
      .post("/api/user/feedback", payload)
      .then(() => {
        console.log("SENDING:", this.props.feedback);
        //clear global state
        // this.props.dispatch({ type: 'GET_FEEDBACK', payload:this.props.feedback });
      })
      .catch((error) => {
        console.log("SORRY, couldnt send post", error);
      });
    this.next();
  };

  render() {
    console.log(this.props.feedback);

    //   const { feeling, understanding, support, comments } = this.props.feedback;
    return (
      <div>
        <h2>Review your feedback</h2>
        <form>
          {/*<button variant="container" color="primary" onClick={this.previous}>
            Previous
    </button>*/}
          {/* {this.props.feedback.map((feedbacks, index) => {
        return ( */}
          <ul>
            <li>
              Understanding: {this.props.feedback.understanding}
              <br />
              Quality: {this.props.feedback.quality}
              <br />
              Interest Level: {this.props.feedback.interest}
              <br />
              Comments: {this.props.feedback.comments}
            </li>
          </ul>
          <br />
          <Button
            id="review"
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => this.submit()}
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // we have to take the global state, and only pull out
    // what we care about. then return that object, which
    // will then be passed in as a prop of the same name.
    // pull feedback from Redux store
    feedback: state.feedback,
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(ReviewForm));
