import React, { Component } from "react";
import Axios from "axios";
import "./InfoPage.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import InfoPageItem from "../InfoPageItem/InfoPageItem";
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
    this.getVideos();
    this.props.dispatch({ type: "FETCH_VIDEOS" });
  }

  getVideos = () => {
    Axios.get("/api/shelf/videos")
      .then((result) => {
        this.setState({
          data: [...result.data],
        });
      })
      .catch((error) => console.log(error));
  };

  postVideos = () => {
    console.log("in onSubmit");
    Axios.post("/api/shelf", {
      url: this.state.url,
      category_id: this.state.category_id,
    })
      .then((result) => {
        this.setState({ category_id: "", url: "" });
        this.getVideos();
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
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
          {this.state.data.map((item) => {
            console.log("These are the video items", item);

            return <InfoPageItem key={item.id} item={item} />;
          })}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default withRouter(connect(mapStateToProps)(InfoPage));
