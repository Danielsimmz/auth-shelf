import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./UserPageList.css";

class UserPageList extends Component {
  showCategory = () => {
    this.props.dispatch({
      type: "PUT_CATEGORY",
      payload: {
        name: this.props.videoItem.name,
      },
    });
    this.next();
  };
  next = () => {
    this.props.history.push("/details"); //takes customer to next "page"
    // this.props.dispatch({ type: "FETCH_VIDEOSS"});
  };

  render() {
    return (
      <div className="">
        <span id="userPage">
          <img
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              boxShadow: "0px 25px 50px -25px rgba(0,0,0,0.75)",
            }}
            src={this.props.videoItem.poster}
            alt={this.props.videoItem.name}
          ></img>
          <br />
          {this.props.videoItem.name}
          <button
            id={this.props.videoItem.id}
            onClick={() => this.showCategory()}
          >
            View
          </button>
          <br />
        </span>
      </div>
    );
  }
}

export default withRouter(connect()(UserPageList));
