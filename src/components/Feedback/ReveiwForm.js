import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class ReviewForm extends Component {
  //this is the function for the next button that takes
  //the user to the next page in the process
  next = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  //this function takes user to previous page
//   previous = (event) => {
//     event.preventDefault();
//     this.props.history.push("/comments");
//   };
  //this function loops through the array of feedback and
  postFeedback = () => {
    console.log(`FEEDBACK POST IS: `, this.props.feedback, this.props.user.id);
    axios
      .post("/api/user/feedback", this.props.feedback, this.props.user.id)
      .then(() => {
        console.log("SENDING:", this.props.feedback);
        //clear global state
        // this.props.dispatch({ type: 'GET_FEEDBACK', payload:this.props.feedback });
      })
      .catch((error) => {
        console.log("SORRY, couldnt send post", error);
      });
  };

  render() {
    console.log(this.props.feedback);

    //   const { feeling, understanding, support, comments } = this.props.feedback;
    return (
      <div>
        <h2>Review your feedback</h2>
        <form onSubmit={() => this.next}>
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
          <button
            id="review"
            variant="container"
            color="primary"
            type="submit"
            onClick={() => this.postFeedback()}
          >
            submit
          </button>
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
