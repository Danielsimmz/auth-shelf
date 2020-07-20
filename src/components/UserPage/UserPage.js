import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router";
import UserPageList from "../UserPageList/UserPageList";
import "./UserPage.css";

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  //setting state to local
  state = {
    data: [""],
    category_id: "",
    url: "",
    isEditable: false,
  };

  //doesn't allow page to load on DOM before necessary 
  //elements have been summoned
  componentDidMount() {
    this.getVideos();
  }

  //
  getVideos = () => {
    Axios.get("/api/shelf")
      .then((result) => {
        this.setState({
          data: [...result.data],
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <h1 className="userPage header" id="welcome">
          Welcome, {this.props.user.username}!
        </h1>
        <h2 className="userPage header">Categories</h2>
        <div className="container justify-content-center ">
          <div className="row justify-content-around">
            <br />
            <ul className="userPage">
              {this.state.data.map((videoItem, i) => {
                console.log("VideoItem is", videoItem);
                return <UserPageList key={i} videoItem={videoItem} />;
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  category: state.categoryReducer,
});

// this allows us to use <App /> in index.js
export default withRouter(connect(mapStateToProps)(UserPage));