import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import Axios from "axios";
import { withRouter } from "react-router";

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  state = {
    data: [""],
    description: "",
    image_url: "",
    isEditable: false,
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = () => {
    Axios.get("/api/shelf")
      .then((result) => {
        this.setState({
          data: [...result.data],
        });
      })
      .catch((error) => console.log(error));
  };
  showCategory = () => {
    this.props.dispatch({
      type: "PUT_CATEGORY",
      payload: {
        category: this.state.data.name,
      },
    });
    this.next();
  };

  next = () => {
    this.props.history.push("/details"); //takes customer to next "page"
  };

  render() {
    return (
      <>
        <div className="text-center">
          <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
          <p>Your ID is: {this.props.user.id}</p>
          <LogOutButton className="log-in" />

          <br />
          {this.state.data.map((item, i) => (
            <span key={i}>
              <img
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  boxShadow: "0px 25px 50px -25px rgba(0,0,0,0.75)",
                }}
                src={item.poster}
                alt={item.name}
              ></img>
              <br />
              {item.name}
              <button id={item.id} onClick={this.showCategory}>
                View
              </button>
              <br />
              {/* <button
                id={item.id}
                onClick={() => this.setState({ isEditable: true })}
              >
                Update
              </button> */}
              {/* {this.state.isEditable ? (
                <EditForm
                  updateImage={this.updateImage}
                  notEditable={() => this.setState({ isEditable: false })}
                  id={item.id}
                />
              ) : (
                <></>
              )} */}
            </span>
          ))}
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
