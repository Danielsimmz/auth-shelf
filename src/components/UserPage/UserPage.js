import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import Axios from "axios";
import { withRouter } from "react-router";
import UserPageList from "../UserPageList/UserPageList";
import './UserPage.css';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  state = {
    data: [""],
    category_id: "",
    url: "",
    isEditable: false,
  };

  componentDidMount() {
    this.getVideos();
  }

  // componentWillUnmount() {
  //   this.getImages();
  // }

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
        <div className="text-center userPage">
          <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
          <p>Your ID is: {this.props.user.id}</p>
          <LogOutButton className="log-in" />

          <br />
          {this.state.data.map((videoItem, i) => {
            console.log("VideoItem is", videoItem);
            return <UserPageList key={i} videoItem={videoItem} />;
          })}
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
  category: state.categoryReducer
});

// this allows us to use <App /> in index.js
export default withRouter(connect(mapStateToProps)(UserPage));
