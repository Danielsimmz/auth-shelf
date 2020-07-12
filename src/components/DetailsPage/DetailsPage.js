import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactPlayer from "react-player";

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
      console.log(this.props.video);
    for (let object of this.props.video) {
      if (this.props.category.category === object.name) {
        
        console.log(object);
        
        

        return object.videos.map((video) => 
          <ReactPlayer
            width="480px"
            height="360px"
            controls
            url={object.videos}
          />
        );
      }
    }
  };
  render() {
    return (
      <>
        <div className="text-center">
          <h3>
            This is the Videos associated with Category:
            {this.props.category.category}
          </h3>
          <ul><li>{this.mountVideos()}</li></ul>
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
