import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class EditForm extends Component {
  // setting local state for the inputs
  state = {
    url: "",
    category_id: 0,
    id: 0,
    redirect: false,
  };

  componentDidMount() {
    console.log("this is props video", this.props.video);
    this.changeState();
  }

  changeState = () => {
    let value = 0;
    console.log("this is changeState");

    for (let i = 0; i < this.props.video.length; i++) {
      const element = this.props.video[i];
      console.log("this is the element", element);

      let id = this.props.video.id;
      let url = element.url;
      let category_id = element.category_id;
      console.log(value);
      return this.setState({
        url: url,
        category_id: category_id,
        id: id,
      });
    }
  };
  handleSubmit = () => {
    console.log("this is handlesubmit:", this.state);
    const payload = {
      id: this.props.video.id,
      url: this.state.url,
      category_id: this.state.category_id,
    };
    if (this.state.url !== "" && this.state.category_id !== 0) {
      this.props.dispatch({ type: "EDIT_VIDEO", payload: payload });
      this.setState({ redirect: true });
    } else {
      alert("please make sure input are not empty");
    }
    this.doneEdit();
  };

  doneEdit() {
    this.props.history.push("/admin");
  }

  handleChange = (param, event) => {
    this.setState({
      [param]: event.target.value,
    });
  };

  // confirmation box before you edit the movie
  submit = (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to edit this?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleSubmit(),
        },
        {
          label: "No",
          onClick: () => this.setState({ redirect: true }),
        },
      ],
    });
  };

  //uses the Redirect to back to details page with the confirmation box
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/edit" />;
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.submit}>
          Video URL:
          <input
            type="text"
            value={this.state.url}
            onChange={(event) => this.handleChange("url", event)}
          />
          <br />
          category_id:
          <textarea
            type="number"
            value={this.state.category_id}
            onChange={(event) => this.handleChange("category_id", event)}
          />
          <br />
          <Link to="/admin">
            <button className="btn btn-primary btn-lg">Back to Admin</button>
          </Link>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

// bringing in the video details to use as props
const mapStateToProps = (state) => {

  return {
    video: state.details,
  };
};

export default withRouter(connect(mapStateToProps)(EditForm));
