import React, { Component } from "react";
import Axios from "axios";
import "./InfoPage.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import InfoPageItem from "../InfoPageItem/InfoPageItem";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
// import EditForm from "../EditForm/EditForm";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  state = {
    data: [""],
    category_id: "",
    url: "",
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_VIDEOS" });
    this.props.dispatch({ type: "FETCH_FEEDBACK" });
  }

  postVideos = () => {
    console.log("in onSubmit");
    Axios.post("/api/shelf", {
      url: this.state.url,
      category_id: this.state.category_id,
    })
      .then((result) => {
        this.setState({ category_id: "", url: "" });
        this.props.dispatch({ type: "FETCH_VIDEOS" });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <div>
          <h2>Administrator:{this.props.user.username}</h2>

          <form className="text-center" onSubmit={() => this.postVideos()}>
            Video URL:
            <input
              type="text"
              value={this.state.url}
              onChange={(e) => this.setState({ url: e.target.value })}
            />
            <br />
            Category ID:
            <textarea
              value={this.state.category_id}
              onChange={(e) => this.setState({ category_id: e.target.value })}
            />
            <br />
            <input type="submit" value="Upload Video" />
          </form>

          <ul className="display">
            {this.props.videos.map((item) => {
              console.log("These are the video items", item);

              return <InfoPageItem key={item.id} item={item} />;
            })}
          </ul>
          <div>
            {this.props.feedback.map((feedbacks) => {
              console.log("These are the feedback items", feedbacks);
              return <FeedbackForm key={feedbacks.id} feedbacks={feedbacks} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  videos: state.videosReducer,
  feedback: state.feedbackForm,
});
export default withRouter(connect(mapStateToProps)(InfoPage));
