import React, { Component } from "react";
import Axios from "axios";
import "./InfoPage.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import InfoPageItem from "../InfoPageItem/InfoPageItem";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css


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

  //this allows the DOM to load when all the required items have been fetched
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_VIDEOS" });
    this.props.dispatch({ type: "FETCH_FEEDBACK" });
  }

  //this function sends the captured data of new video to server
  postVideos = () => {
    console.log("in onSubmit");
    Axios.post("/api/shelf", {
      url: this.state.url,
      category_id: this.state.category_id,
    })
      //this resets the state
      .then((result) => {
        this.setState({ category_id: "", url: "" });
        this.props.dispatch({ type: "FETCH_VIDEOS" });
      })
      .catch((error) => console.log(error));
  };

  submit = () => {
    confirmAlert({
      title: "Confirm to Upload",
      message: "Are you sure you want to upload this video?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.postVideos(),
        },
        {
          label: "No",
          onClick: () => this.setState({ redirect: true }),
        },
      ],
    });
  };

  render() {
    return (
      <>
        <div className="container justify-content-center">
          <div className="row justify-content-around">
            <h2>Administrator:{this.props.user.username}</h2>
            <form className="text-center" onSubmit={() => this.submit()}>
              <FormControl>
                <InputLabel htmlFor="videoUrl" name="videoUrl">
                  Video URL:
                </InputLabel>
                {/* <Input
                id="input-with-icon-adornment"
                value={this.state.username}
                placeholder="name@example.com"
                variant="contained"
                onChange={this.handleInputChangeFor("username")} */}
                <Input
                  type="text"
                  value={this.state.url}
                  placeholder="http//:www.example.com"
                  onChange={(e) => this.setState({ url: e.target.value })}
                />
              </FormControl>
              <br />
              <FormControl>
                <InputLabel id="demo-simple-select-helper-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.category_id}
                  onChange={(e) =>
                    this.setState({ category_id: e.target.value })
                  }
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                </Select>
                <FormHelperText>Choose Category from 1-5</FormHelperText>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  value="Upload Video"
                >
                  Upload
                </Button>
              </FormControl>
            </form>
            <ul className="display">
              {this.props.videos.map((item) => {
                return <InfoPageItem key={item.id} item={item} />;
              })}
            </ul>
            <FeedbackForm feedback={this.props.feedback} />;
            {/* <FeedbackForm key={feedbacks.id} feedback={this.props.feedback} feedbacks={feedbacks} />; */}
            {/* {this.props.feedback.map((feedbacks) => {
              return <FeedbackForm key={feedbacks.id} feedbacks={feedbacks} />;
            })} */}
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
