import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactPlayer from "react-player";
import { Paper } from "@material-ui/core";

class DetailsPage extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the Movie details from the API
    this.props.dispatch({ type: "FETCH_VIDEOSS" });
  }

  //   componentWillUnmount() {
  //     // use component will unmount to store info for page so that when you come back to page the info reloads with did mount
  //     this.props.dispatch({ type: "FETCH_VIDEOSS" });
  //   }

  //this function loops through the array of videos and finds the ones that match with the category that was clicked
  mountVideos = () => {
    for (let object of this.props.video) {
      if (this.props.category.name === object.name) {
        return object.videos.map((video) => (
          <ul className="display">
            <li>
              <ReactPlayer width="480px" height="360px" controls url={video} />
            </li>
          </ul>
        ));
      }
    }
  };
  render() {
    return (
      <>
        <div className="container justify-content-center">
          <div className="row justify-content-around">
            <h3>
              This is the Videos associated with Category:
              <br />
              {this.props.category.name}
            </h3>
            <Paper className="paper" elevation={3} variant="outlined">
              {this.mountVideos()}
            </Paper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  category: state.categoryReducer,
  video: state.videoss,
});

export default withRouter(connect(mapStateToProps)(DetailsPage));
